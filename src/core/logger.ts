export type LogFields = Record<string, unknown>;

type LevelType = 'INFO' | 'WARNING' | 'ERROR' | 'DEBUG';

export interface Logger {
  info(message: string, fields?: LogFields): void;
  warn(message: string, fields?: LogFields): void;
  error(message: string, fields?: LogFields): void;
  debug(message: string, fields?: LogFields): void;
}

class ConsoleLogger implements Logger {
  info(message: string, fields: LogFields = {}): void {
    console.info(formatLog('INFO', message, fields));
  }

  warn(message: string, fields: LogFields = {}): void {
    console.warn(formatLog('WARNING', message, fields));
  }

  error(message: string, fields: LogFields = {}): void {
    console.error(formatLog('ERROR', message, fields));
  }

  debug(message: string, fields: LogFields = {}): void {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(formatLog('DEBUG', message, fields));
    }
  }
}

function formatLog(
  level: LevelType,
  message: string,
  fields: LogFields,
): string {
  return JSON.stringify({
    level,
    message,
    ...fields,
    timestamp: new Date().toISOString(),
  });
}

export const logger: Logger = new ConsoleLogger();
