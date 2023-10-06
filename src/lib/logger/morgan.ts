import morgan from 'morgan';
import { Request, Response } from 'express';
import { config } from '../../config/config';
import { Logger } from './logger';

morgan.token('message', (_req: Request, res: Response) => res.locals['errorMessage'] || '');

const getIpFormat = () => (config.env === 'production' ? ':remote-addr - ' : '');
const successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`;
const errorResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`;

const logger = new Logger('express');

export const successHandler = morgan(successResponseFormat, {
  skip: (_: Request, res: Response) => res.statusCode >= 400,
  stream: {
    write: (message: string) => logger.info(message.trim()),
  },
});

export const errorHandler = morgan(errorResponseFormat, {
  skip: (_: Request, res: Response) => res.statusCode < 400,
  stream: {
    write: (message: string) => logger.error(message.trim()),
  }
});