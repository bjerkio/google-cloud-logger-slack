import { LogEntry, SlackMessageRequest } from './types';

export async function parseLog(
  entry: LogEntry,
): Promise<SlackMessageRequest | void> {
  if (entry.jsonPayload?.slack) {
    return entry.jsonPayload.slack;
  }

  if (
    [
      'github.com/bjerkio/gcl-slack@v1',
      'github.com/bjerkio/nestjs-slack@v1',
    ].includes(entry.operation?.producer) &&
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
