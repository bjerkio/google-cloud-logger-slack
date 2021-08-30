import axios, { AxiosError } from 'axios';
import { parseLog } from '../parse-log';
import type { LogEntry, SlackMethod, SlackWebhookOptions } from '../types';

export type WebhookResponse = 'ok' | string;

export class SlackWebhookMethod implements SlackMethod {
  constructor(private readonly config: SlackWebhookOptions) {}

  async send(entry: LogEntry): Promise<void> {
    const parsedLog = await parseLog(entry);
    await this.sendRequest(parsedLog);
  }

  private async sendRequest(data: unknown): Promise<void> {
    await axios.post(this.config.url, data).catch((error: AxiosError) => {
      if (error.response) {
        throw new Error(
          `Could not send request to Slack Webhook: ${error.response.data}`,
        );
      }
    });
  }
}
