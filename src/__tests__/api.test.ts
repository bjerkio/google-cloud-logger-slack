import { MockedWebClient } from '@slack-wrench/jest-mock-web-client';
import { SlackApiMethod } from '../methods/api';
import { createLogEntry } from './fixtures';

describe('api', () => {
  const m = new SlackApiMethod({
    token: 'a-token',
    defaultChannel: 'my-channel',
  });

  it('must send simple messages to Slack API', async () => {
    await m.send(createLogEntry('hello-world'));

    expect(
      MockedWebClient.mock.instances[0].chat.postMessage,
    ).toHaveBeenCalledWith({
      channel: 'my-channel',
      text: 'hello-world',
    });
  });

  it('must send simple JSON Objects to Slack API', async () => {
    await m.send(createLogEntry({ message: 'hello world message' }));

    expect(
      MockedWebClient.mock.instances[0].chat.postMessage,
    ).toHaveBeenCalledWith({
      channel: 'my-channel',
      text: 'hello world message',
    });
  });

  it('must send requests with object to Slack API', async () => {
    await m.send(
      createLogEntry({
        slack: {
          text: 'hello, world',
        },
      }),
    );

    expect(
      MockedWebClient.mock.instances[0].chat.postMessage,
    ).toHaveBeenCalledWith({
      channel: 'my-channel',
      text: 'hello, world',
    });
  });
});
