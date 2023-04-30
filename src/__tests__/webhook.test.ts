import nock from 'nock';
import { SlackWebhookMethod } from '../methods/webhook';
import { createLogEntry } from './fixtures';
import { MockAgent, setGlobalDispatcher } from 'undici';

const agent = new MockAgent();
agent.disableNetConnect();

setGlobalDispatcher(agent);

describe('api', () => {
  const client = agent.get('https://hooks.slack.com');

  it('must send simple messages to webhook', async () => {
    const m = new SlackWebhookMethod({
      url: 'https://hooks.slack.com/services/T00000000/B00000000/simple-message',
    });
    client
      .intercept({
        path: '/services/T00000000/B00000000/simple-message',
        method: 'POST',
        body: JSON.stringify({
          text: 'hello-world',
        }),
      })
      .reply(200, 'ok');

    const { success } = await m.send(createLogEntry('hello-world'));
    expect(success).toBeTruthy();
  });

  it('must throw if webhook not replies «ok»', async () => {
    const m = new SlackWebhookMethod({
      url: 'https://hooks.slack.com/services/T00000000/B00000000/throw-error',
    });
    client
      .intercept({
        path: '/services/T00000000/B00000000/throw-error',
        method: 'POST',
        body: JSON.stringify({
          text: 'hello no service',
        }),
      })
      .reply(404, 'no_service');

    expect(() =>
      m.send(createLogEntry('hello no service')),
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      `"Could not send request to Slack Webhook: no_service"`,
    );
  });

  it('must send simple JSON Objects to webhook', async () => {
    const m = new SlackWebhookMethod({
      url: 'https://hooks.slack.com/services/T00000000/B00000000/json-objects',
    });
    client
      .intercept({
        path: '/services/T00000000/B00000000/json-objects',
        method: 'POST',
        body: JSON.stringify({
          text: 'hello world message',
        }),
      })
      .reply(200, 'ok');

    const { success } = await m.send(
      createLogEntry({ message: 'hello world message' }),
    );
    expect(success).toBeTruthy();
  });

  it('must send requests with object to webhook', async () => {
    const m = new SlackWebhookMethod({
      url: 'https://hooks.slack.com/services/T00000000/B00000000/with-object',
    });
    client
      .intercept({
        path: '/services/T00000000/B00000000/with-object',
        method: 'POST',
        body: JSON.stringify({
          text: 'hello, world',
        }),
      })
      .reply(200, 'ok');

    const { success } = await m.send(
      createLogEntry({
        slack: {
          text: 'hello, world',
        },
      }),
    );
    expect(success).toBeTruthy();
  });
});
