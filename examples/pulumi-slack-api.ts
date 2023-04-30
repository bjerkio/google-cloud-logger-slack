import * as gcp from '@pulumi/gcp';
import * as pulumi from '@pulumi/pulumi';
import { makePulumiCallback } from 'gcl-slack';

const name = 'slack';

export const topic = new gcp.pubsub.Topic(name, {});

const config = new pulumi.Config(name);

topic.onMessagePublished(name, {
  region: 'europe-west1',
  runtime: 'nodejs18',
  environmentVariables: {
    SLACK_TOKEN: config.require('token'),
  },
  callback: makePulumiCallback('api'),
});

const logSink = new gcp.logging.ProjectSink(name, {
  filter:
    'operation.producer="github.com/bjerkio/google-cloud-logger-slack@v1"',
  destination: pulumi.interpolate`pubsub.googleapis.com/${topic.id}`,
});

new gcp.pubsub.TopicIAMMember(name, {
  topic: topic.name,
  role: 'roles/pubsub.publisher',
  member: logSink.writerIdentity,
});
