/* istanbul ignore file */
import { LogEntry } from '../types';

export function createLogEntry(payload: unknown): LogEntry {
  if (typeof payload === 'string') {
    return {
      insertId: 'insertId',
      logName: 'logName',
      receiveTimestamp: 'receiveTimestamp',
      severity: 'INFO',
      timestamp: 'timestamp',
      textPayload: payload,
    };
  }

  return {
    insertId: 'insertId',
    logName: 'logName',
    receiveTimestamp: 'receiveTimestamp',
    severity: 'INFO',
    timestamp: 'timestamp',
    jsonPayload: payload,
  };
}
