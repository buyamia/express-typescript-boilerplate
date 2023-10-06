import * as path from 'node:path';
import * as dotenv from 'dotenv';
import * as process from 'process';

import { normalizePort } from './utils';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export const config = {
  env: process.env.NODE_ENV || 'development',
  port: normalizePort(process.env.PORT || '3000'),
  logLevel: process.env.LOG_LEVEL || 'info',
  mongoose: {
    url: process.env.MONGODB_URL,
  },
};

