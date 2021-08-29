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

    await this.client.chat.postMessage({
      channel: this.config.defaultChannel,
      text: entry.jsonPayload?.message ?? entry.textPayload,
    });
  }
}
