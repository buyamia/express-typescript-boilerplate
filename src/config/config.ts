import * as path from 'node:path';
import * as dotenv from 'dotenv';
import * as process from 'process';

dotenv.config({ path: path.join(process.cwd(), '.env') });

function normalizePort(port: string): number | string | boolean {
  const parsedPort = parseInt(port, 10);
  if (isNaN(parsedPort)) {
    // named pipe
    return port;
  }
  if (parsedPort >= 0) {
    // port number
    return parsedPort;
  }
  return false;
}

export const config = {
  env: process.env.NODE_ENV || 'development',
  port: normalizePort(process.env.PORT || '3000'),
  logLevel: process.env.LOG_LEVEL || 'info',
  mongoose: {
    url: process.env.MONGODB_URL,
  },
};
