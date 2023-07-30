import * as gcp from '@pulumi/gcp';
import * as pulumi from '@pulumi/pulumi';

const config = new pulumi.Config('slack');
const name = 'slack-logger';
const slackAgentTag = 'v3.1.0';
const channel = 'a-channel';
const projectId = 'the-project-id';

const topic = new gcp.pubsub.Topic(name, {});

const serviceAccount = new gcp.serviceaccount.Account(
  name,
  {
    accountId: name,
  }
);

const service = new gcp.cloudrunv2.Service(
  name,
  {
    name: `slack-logger-${name}`,
    location: 'europe-west1',
    description: `Slack logger – ${name}`,
    template: {
      serviceAccount: serviceAccount.email,
      containers: [
        {
          image: `"ghcr.io/bjerkio/google-cloud-logger-slack:${slackAgentTag}`,
          envs: [
            {
              name: 'SLACK_TOKEN',
              value: config.requireSecret('bot-oauth-token'),
            },
            {
              name: 'DEFAULT_CHANNEL',
              value: channel,
            },
          ],
        },
      ],
    },
  }
);

new gcp.eventarc.Trigger(
  name,
  {
    location: 'europe-west1',
    transports: [
      {
        pubsubs: [
          {
            topic: topic.name,
          },
        ],
      },
    ],
    matchingCriterias: [
      {
        attribute: 'type',
        value: 'google.cloud.pubsub.topic.v1.messagePublished',
      },
    ],
    serviceAccount: serviceAccount.email,
    destination: {
      cloudRunService: {
        service: service.name,
        region: 'europe-west1',
      },
    },
  }
);

new gcp.projects.IAMMember(
  name,
  {
    project: projectId,
    role: 'roles/eventarc.eventReceiver',
    member: pulumi.interpolate`serviceAccount:${serviceAccount.email}`,
  }
);

new gcp.cloudrunv2.ServiceIamMember(
  name,
  {
    name: service.name,
    location: 'europe-west1',
    role: 'roles/run.invoker',
    member: pulumi.interpolate`serviceAccount:${serviceAccount.email}`,
  }
);

const logSink = new gcp.logging.ProjectSink(
  name,
  {
    name,
    filter:
      'operation.producer="github.com/bjerkio/google-cloud-logger-slack@v1"',
    destination: pulumi.interpolate`pubsub.googleapis.com/${topic.id}`,
  }
);

new gcp.pubsub.TopicIAMMember(
  name,
  {
    topic: topic.name,
    role: 'roles/pubsub.publisher',
    member: logSink.writerIdentity,
  }
);
