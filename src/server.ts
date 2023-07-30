import { fastify } from 'fastify';
import * as rt from 'runtypes';
import { SlackConfig } from './types';
import { fastifyPlugin } from './index';

const slackWebhookEnvironment = rt.Record({
  SLACK_WEBHOOK_URL: rt.String,
});

const slackApiEnvironment = rt.Record({
  SLACK_TOKEN: rt.String,
  DEFAULT_CHANNEL: rt.String,
});

function makeSlackOptions(): SlackConfig {
  if (slackWebhookEnvironment.guard(process.env)) {
    const env = slackWebhookEnvironment.check(process.env);
    return {
      type: 'webhook',
      webhookOptions: {
        url: env.SLACK_WEBHOOK_URL,
      },
    };
  }

  if (slackApiEnvironment.guard(process.env)) {
    const env = slackApiEnvironment.check(process.env);
    return {
      type: 'api',
      apiOptions: {
        token: env.SLACK_TOKEN,
        defaultChannel: env.DEFAULT_CHANNEL,
      },
    };
  }

  throw new Error('No Slack configuration found');
}

async function makeServer() {
  const app = fastify();

  await app.register(fastifyPlugin, makeSlackOptions());

  await app.listen({
    port: Number(process.env.PORT) || 3000,
    host: '0.0.0.0',
  });
}

void makeServer();