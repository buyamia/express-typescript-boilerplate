import { format, transports, createLogger, Logger as WinstonLogger } from 'winston';
import { config } from '../../config/config';

export class Logger {
  private readonly scope: string = 'app';
  private readonly logger: WinstonLogger;

  constructor(scope?: string) {
    if (!scope) this.scope = scope;

    this.logger = createLogger({
      transports: [
        new transports.Console({
          level: config.logLevel,
          handleExceptions: true,
          format: config.env === 'development'
            ? format.combine(format.json())
            : format.combine(format.colorize(), format.simple())
        }),
      ],
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

  private log(level: string, message: string, args: any[]): void {
    this.logger[level](`[${this.scope}] ${message}`, args);
  }
}