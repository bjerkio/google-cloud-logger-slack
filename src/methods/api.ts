import { WebClient } from '@slack/web-api';
import { parseLog } from '../parse-log';
import type { LogEntry, SlackApiOptions, SlackMethod } from '../types';

export class SlackApiMethod implements SlackMethod {
  private client: WebClient;

  constructor(private readonly config: SlackApiOptions) {
    this.client = new WebClient(config.token, config.clientOptions);
  }

  async send(entry: LogEntry): Promise<void> {
    const parsedLog = await parseLog(entry);
    await this.client.chat.postMessage({
      channel: this.config.defaultChannel ?? '',
      ...parsedLog,
    });
  }
}
