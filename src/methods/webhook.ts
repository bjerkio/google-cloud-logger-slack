import { fetch } from 'undici';
import { parseLog } from '../parse-log';
import type { LogEntry, SlackMethod, SlackWebhookOptions } from '../types';

export class SlackWebhookMethod implements SlackMethod {
  constructor(private readonly config: SlackWebhookOptions) {}

  async send(entry: LogEntry): Promise<{ success: boolean }> {
    const parsedLog = await parseLog(entry);
    await this.sendRequest(parsedLog);

    return { success: true };
  }

  private async sendRequest(data: unknown): Promise<{ success: true }> {
    const result = await fetch(this.config.url, {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (result.status !== 200) {
      throw new Error(
        `Could not send request to Slack Webhook: ${await result.text()}`,
      );
    }

    return { success: true };
  }
}
