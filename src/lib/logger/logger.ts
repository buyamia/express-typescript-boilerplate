import {
  format,
  transports,
  createLogger,
  Logger as WinstonLogger,
} from 'winston';

import { config } from '@config';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const loggerTransports: any[] = [];
if (config.env === 'development') {
  loggerTransports.push(
    new transports.Console({
      format: format.combine(format.cli(), format.splat()),
    }),
  );
} else {
  loggerTransports.push(new transports.Console());
}

export class Logger {
  private readonly scope: string = 'app';
  private readonly logger: WinstonLogger;

  constructor(scope?: string) {
    if (scope) this.scope = scope;

    this.logger = createLogger({
      level: config.logLevel,
      transports: loggerTransports,
    });
  }

  public debug(message: string, ...args: any[]): void {
    this.log('debug', message, args);
  }

  public info(message: string, ...args: any[]): void {
    this.log('info', message, args);
  }

  public warn(message: string, ...args: any[]): void {
    this.log('warn', message, args);
  }

  public error(message: string, ...args: any[]): void {
    this.log('error', message, args);
  }

  private log(level: LogLevel, message: string, args: any[]): void {
    this.logger[level](`[${this.scope}] ${message}`, args);
  }
}
