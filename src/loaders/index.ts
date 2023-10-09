import { Express } from 'express';

import { PingController } from '@controllers/ping.controller';
import { PostController } from '@controllers/post.controller';
import { LoggerInstance } from '@lib/logger';
import { GlobalExampleMiddleware } from '@middlewares/global-example.middleware';

import expressLoader from './express';
import mongooseLoader from './mongoose';

export async function load(app: Express) {
  const logger = LoggerInstance;

  await mongooseLoader();
  logger.info('Mongo connection initiated');

  expressLoader({
    app,
    controllers: [PingController, PostController],
    middlewares: [GlobalExampleMiddleware],
  });
  logger.info('Express loaded');
}
