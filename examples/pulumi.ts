import * as gcp from "@pulumi/gcp";
import * as pulumi from "@pulumi/pulumi";
import { makeHandler } from "gcl-slack";
import { handlePubSubMessage } from "pubsub-http-handler";

const name = "slack";

export const topic = new gcp.pubsub.Topic(name, {}, { provider });

const config = new pulumi.Config(name);

topic.onMessagePublished(name, {
  region: "europe-west1",
  runtime: "nodejs14",
  environmentVariables: {
    WEBHOOK_URL: config.require("webhook-url"),
  },
  callback: async (message) => {
    const handler = makeHandler({
      type: "webhook",
      webhookOptions: { url: process.env.WEBHOOK_URL ?? "" },
    });

    await handlePubSubMessage({
      message,
      handler,
      parseJson: true,
    });
  },
});

const logSink = new gcp.logging.ProjectSink(name, {
  filter: 'operation.producer="github.com/bjerkio/nestjs-slack@v1"',
  destination: pulumi.interpolate`pubsub.googleapis.com/${topic.id}`,
});

new gcp.pubsub.TopicIAMMember(name, {
  topic: topic.name,
  role: "roles/pubsub.publisher",
  member: logSink.writerIdentity,
});
