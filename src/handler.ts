import { PubSubHandler } from 'pubsub-http-handler';
import { SlackApiMethod } from './methods/api';
import { SlackWebhookMethod } from './methods/webhook';
import { LogEntry, SlackConfig, SlackMethod } from './types';

export function makeHandler(config: SlackConfig): PubSubHandler<LogEntry> {
  if (config.type !== 'api' && config.type !== 'webhook') {
    throw new Error('Slack config type was neither set to `api` nor `webhook`');
  }

  let method: SlackMethod;

  if (config.type === 'api') {
    method = new SlackApiMethod(config.apiOptions);
  }

  if (config.type === 'webhook') {
    method = new SlackWebhookMethod(config.webhookOptions);
  }

  return async ({ data }) => {
    await method.send(data);
  };
}
