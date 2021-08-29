import axios, { AxiosError } from 'axios';
import type { LogEntry, SlackMethod, SlackWebhookOptions } from '../types';

export type WebhookResponse = 'ok' | string;

export class SlackWebhookMethod implements SlackMethod {
  constructor(private readonly config: SlackWebhookOptions) {}

  async send(entry: LogEntry): Promise<void> {
    if (entry.jsonPayload?.slack) {
      await this.sendRequest(entry.jsonPayload.slack);
      return;
    }

    await this.sendRequest({
      text: entry.jsonPayload?.message ?? entry.textPayload,
    });
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
