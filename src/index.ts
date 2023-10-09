import 'reflect-metadata';
import 'source-map-support/register';
import express from 'express';

import { config } from '@config';
import { LoggerInstance } from '@lib/logger';
import { load } from './loaders';

async function bootstrap() {
  const app = express();

  await load(app);

  app.listen(config.port, () => {
    LoggerInstance.info(`Server listening on port ${config.port}`);
  });
}
bootstrap();
