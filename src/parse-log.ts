import { LogEntry, SlackMessageRequest } from './types';

export async function parseLog(entry: LogEntry): Promise<SlackMessageRequest> {
  if (entry.jsonPayload?.slack) {
    return entry.jsonPayload.slack;
  }

  if (
    entry.operation?.producer === 'github.com/bjerkio/nestjs-slack@v1' &&
    typeof entry.jsonPayload?.message !== 'string'
  ) {
    return entry.jsonPayload?.message?.slack;
  }

  if (
    entry.jsonPayload?.message &&
    typeof entry.jsonPayload?.message === 'string'
  ) {
    return {
      text: entry.jsonPayload?.message,
    };
  }

  if (entry.textPayload) {
    return {
      text: entry.textPayload,
    };
  }
}
