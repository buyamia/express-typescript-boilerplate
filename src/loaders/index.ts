import { PingController } from '@controllers/ping.controller';
import { PostController } from '@controllers/post.controller';
import { Express } from 'express';

import { LoggerInstance } from '@lib/logger';

import expressLoader from './express';
import mongooseLoader from './mongoose';

export async function load(app: Express) {
  const logger = LoggerInstance;

  await mongooseLoader();
  logger.info('Mongo connection initiated');

  expressLoader({
    app,
    controllers: [PingController, PostController],
  });
  logger.info('Express loaded');
}
