import { FastifyPluginAsync } from 'fastify';
import * as phh from 'pubsub-http-handler';
import { handlePubSubMessage } from 'pubsub-http-handler';
import { makeHandler } from './handler';
import { SlackApiOptions, SlackConfig, SlackRequestType } from './types';
export { makeHandler } from './handler';

export const makePubSubCloudFunctions = (
  config: SlackConfig,
): phh.CloudFunctionFun => {
  return phh.createPubSubCloudFunctions(makeHandler(config));
};

export const fastifyPlugin: FastifyPluginAsync<SlackConfig> = async (
  fastify,
  config,
) => {
  return phh.pubSubFastifyPlugin(fastify, { handler: makeHandler(config) });
};

export const makePubSubServer = (
  config: SlackConfig,
): phh.CreatePubSubHandlerResponse => {
  return phh.createPubSubServer(makeHandler(config));
};

export type PulumiCallbackFun = (message: any) => Promise<any>;

export interface PulumiCallbackOptions {
  /**
   * These configuration options are only required when type is set to
   * `api`.
   */
  apiOptions?: Omit<SlackApiOptions, 'token'>;
}

export const makePulumiCallback = (
  type: SlackRequestType,
  options: PulumiCallbackOptions = {},
): PulumiCallbackFun => {
  if (type === 'api') {
    return async (message: any): Promise<void> => {
      const token = process.env.SLACK_TOKEN;
      if (!token) {
        throw new Error('Slack token is missing');
      }

      await handlePubSubMessage({
        message,
        handler: makeHandler({
          type: 'api',
          apiOptions: { token, ...options.apiOptions },
        }),
        parseJson: true,
      });
    };
  } else if (type === 'webhook') {
    return async (message: any): Promise<void> => {
      const url = process.env.WEBHOOK_URL;
      if (!url) {
        throw new Error('Slack webhook URL is missing');
      }

      await handlePubSubMessage({
        message,
        handler: makeHandler({
          type: 'webhook',
          webhookOptions: { url },
        }),
        parseJson: true,
      });
    };
  }

  throw new Error('Wrong configuration');
};
