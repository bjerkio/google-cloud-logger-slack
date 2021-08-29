import { FastifyPluginAsync } from 'fastify';
import * as phh from 'pubsub-http-handler';
import { makeHandler } from './handler';
import { SlackConfig } from './types';
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
