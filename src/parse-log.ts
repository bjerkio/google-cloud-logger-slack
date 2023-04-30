import { LogEntry, SlackMessageRequest } from './types';

function hasSlackObject(
  payload: unknown,
): payload is { slack: SlackMessageRequest } {
  return typeof payload === 'object' && payload !== null && 'slack' in payload;
}

function hasMessageObjectWithSlack(
  payload: unknown,
): payload is { message: { slack: SlackMessageRequest } } {
  const data = payload as { message: { slack: SlackMessageRequest } };
  if (typeof data !== 'object' || data === null) {
    return false;
  }

  if (!('message' in data)) {
    return false;
  }

  if (typeof data.message !== 'object' || data.message === null) {
    return false;
  }

  if (!('slack' in data.message)) {
    return true;
  }

  return true;
}

function hasMessageString(payload: unknown): payload is { message: string } {
  const data = payload as { message: string };
  return (
    typeof data === 'object' &&
    data !== null &&
    'message' in data &&
    typeof data.message === 'string'
  );
}

function isApprovedProducer(producer?: string): boolean {
  if (!producer) {
    return false;
  }

  return [
    'github.com/bjerkio/google-cloud-logger-slack@v1',
    // @deprecated - use google-cloud-logger-slack instead
    'github.com/bjerkio/nestjs-slack@v1',
  ].includes(producer);
}

export async function parseLog(
  entry: LogEntry,
): Promise<SlackMessageRequest | void> {
  if (typeof entry.jsonPayload !== 'object' && entry.textPayload) {
    return {
      text: entry.textPayload,
    };
  }

  if (hasSlackObject(entry.jsonPayload)) {
    return entry.jsonPayload.slack;
  }

  if (
    isApprovedProducer(entry.operation?.producer) &&
    hasMessageObjectWithSlack(entry.jsonPayload)
  ) {
    return entry.jsonPayload.message;
  }

  if (hasMessageString(entry.jsonPayload)) {
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
