import { PubSubHandler } from 'pubsub-http-handler';
import { invariant } from 'ts-invariant';
import { SlackApiMethod } from './methods/api';
import { SlackWebhookMethod } from './methods/webhook';
import { LogEntry, SlackConfig, SlackMethod } from './types';

export function makeHandler<Context = null, Logger = null>(
  config: SlackConfig,
): PubSubHandler<LogEntry, Context, Logger> {
  if (config.type !== 'api' && config.type !== 'webhook') {
    throw new Error('Slack config type was neither set to `api` nor `webhook`');
  }

  let method: SlackMethod;

  if (config.type === 'api') {
    invariant(config.apiOptions, 'expected apiOptions to not be undefined');
    method = new SlackApiMethod(config.apiOptions);
  }

  if (config.type === 'webhook') {
    invariant(
      config.webhookOptions,
      'expected webhookOptions to not be undefined',
    );
    method = new SlackWebhookMethod(config.webhookOptions);
  }

  return async ({ data }) => {
    if (data) {
      await method.send(data);
    }
  };
}
