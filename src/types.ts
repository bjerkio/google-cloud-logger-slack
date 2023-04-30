import type {
  ChatPostMessageArguments,
  WebClientOptions,
} from '@slack/web-api';
import * as rt from 'runtypes';

export interface SlackApiOptions {
  /**
   * You'll need a token to authenticate with Slack Web API
   * Read more: https://api.slack.com/tutorials/tracks/getting-a-token
   */
  token: string;

  clientOptions?: WebClientOptions;

  /**
   * This option is used when channel isn't defined
   * in the log entry. Read more about the Slack object.
   */
  defaultChannel?: string;
}

export interface SlackWebhookOptions {
  url: string;
}

export type SlackRequestType = 'api' | 'webhook';

export interface SlackConfig {
  /**
   * This argument refers to how you want to send requests
   * to Slack.
   *
   * `api` is the default option, it utilizes `@slack/web-api`, which also
   * requires setting `apiOptions`.
   *
   * @default api
   */
  type: SlackRequestType;

  /**
   * These configuration options are only required when type is set to
   * `api`.
   */
  apiOptions?: SlackApiOptions;

  /**
   * These configuration options are only required when type is set to
   * `webhook`.
   */
  webhookOptions?: SlackWebhookOptions;
}

export type SlackMessageRequest = Partial<ChatPostMessageArguments>;

export const logEntryRt = rt.Record({
  /**
   * Metadata
   */
  logName: rt.String,
  insertId: rt.String,
  timestamp: rt.String,
  receiveTimestamp: rt.String,
  severity: rt.Union(
    rt.Literal('DEFAULT'),
    rt.Literal('DEBUG'),
    rt.Literal('INFO'),
    rt.Literal('NOTICE'),
    rt.Literal('WARNING'),
    rt.Literal('ERROR'),
    rt.Literal('CRITICAL'),
    rt.Literal('ALERT'),
    rt.Literal('EMERGENCY'),
  ),
  operation: rt.Dictionary(rt.String, rt.String).optional(),

  textPayload: rt.String.optional(),
  jsonPayload: rt
    .Record({
      slack: rt.Guard((x): x is SlackMessageRequest => true),
      message: rt.String.Or(
        rt.Record({
          slack: rt.Guard((x): x is SlackMessageRequest => true),
        }),
      ).optional(),
    })
    .Or(rt.Unknown)
    .optional(),
});

export type LogEntry = rt.Static<typeof logEntryRt>;

export interface SlackMethod {
  send(entry: LogEntry): Promise<{ success: boolean }>;
}
