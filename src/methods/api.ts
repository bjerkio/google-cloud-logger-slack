import { WebClient } from '@slack/web-api';
import type { LogEntry, SlackApiOptions, SlackMethod } from '../types';

export class SlackApiMethod implements SlackMethod {
  private client: WebClient;

  constructor(private readonly config: SlackApiOptions) {
    this.client = new WebClient(config.token, config.clientOptions);
  }

  async send(entry: LogEntry): Promise<void> {
    if (entry.jsonPayload?.slack) {
      await this.client.chat.postMessage({
        channel: this.config.defaultChannel,
        ...entry.jsonPayload.slack,
      });
      return;
    }

    if (
      entry.operation?.producer === 'github.com/bjerkio/nestjs-slack@v1' &&
      typeof entry.jsonPayload?.message !== 'string'
    ) {
      await this.client.chat.postMessage({
        channel: this.config.defaultChannel,
        ...entry.jsonPayload.message.slack,
      });
      return;
    }

    if (
      entry.jsonPayload?.message &&
      typeof entry.jsonPayload?.message === 'string'
    ) {
      await this.client.chat.postMessage({
        channel: this.config.defaultChannel,
        text: entry.jsonPayload?.message,
      });
      return;
    }

    if (entry.textPayload) {
      await this.client.chat.postMessage({
        channel: this.config.defaultChannel,
        text: entry.textPayload,
      });
    }
  }
}
