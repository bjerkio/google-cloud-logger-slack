import { WebClient } from '@slack/web-api';
import invariant from 'ts-invariant';
import { parseLog } from '../parse-log';
import type { LogEntry, SlackApiOptions, SlackMethod } from '../types';

export class SlackApiMethod implements SlackMethod {
  private client: WebClient;

  constructor(private readonly config: SlackApiOptions) {
    this.client = new WebClient(config.token, config.clientOptions);
  }

  async send(entry: LogEntry): Promise<{ success: boolean }> {
    const parsedLog = await parseLog(entry);

    if (!parsedLog) {
      return { success: false };
    }

    const channel = parsedLog.channel ?? this.config.defaultChannel;

    invariant(channel, 'No channel provided for Slack API method.');

    await this.client.chat.postMessage({
      ...parsedLog,
      channel,
    });

    return { success: true };
  }
}
