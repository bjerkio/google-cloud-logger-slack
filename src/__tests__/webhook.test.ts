import nock from 'nock';
import { SlackWebhookMethod } from '../methods/webhook';
import { createLogEntry } from './fixtures';

describe('api', () => {
  const m = new SlackWebhookMethod({
    url: 'https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX',
  });
  const mock = nock('https://hooks.slack.com/');

  it('must send simple messages to webhook', async () => {
    const scope = mock
      .post('/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX', {
        text: 'hello-world',
      })
      .reply(200, 'ok');

    await m.send(createLogEntry('hello-world'));

    expect(scope.isDone()).toBeTruthy();
  });

  it('must throw if webhook not replies «ok»', async () => {
    const scope = mock
      .post('/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX', {
        text: 'hello no service',
      })
      .reply(404, 'no_service');

    expect(
      m.send(createLogEntry('hello no service')),
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      `"Could not send request to Slack Webhook: no_service"`,
    );
  });

  it('must send simple JSON Objects to webhook', async () => {
    const scope = mock
      .post('/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX', {
        text: 'hello world message',
      })
      .reply(200, 'ok');

    await m.send(createLogEntry({ message: 'hello world message' }));

    expect(scope.isDone()).toBeTruthy();
  });

  it('must send requests with object to webhook', async () => {
    const scope = mock
      .post('/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX', {
        text: 'hello, world',
      })
      .reply(200, 'ok');

    await m.send(
      createLogEntry({
        slack: {
          text: 'hello, world',
        },
      }),
    );

    expect(scope.isDone()).toBeTruthy();
  });
});
