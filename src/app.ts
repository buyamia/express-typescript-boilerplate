import { createServer } from 'node:http';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { HttpError } from 'http-errors';

import { config } from './config/config';
import { Logger } from './lib/logger/logger';
import * as morgan from './lib/logger/morgan';
import { registerHttpRoutes } from './startup/routes';

const app = express();

// set loggers
app.use(morgan.successHandler);
app.use(morgan.errorHandler);

// set security http headers
app.use(helmet());

// enable cors
app.use(cors());

// enable request body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

registerHttpRoutes(app);

const server = createServer(app);
const serverLogger = new Logger('server');

const port = config.port;
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function onError(error: HttpError) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      serverLogger.error(bind + ' requires elevated privileges');
      process.exit(1);
    case 'EADDRINUSE':
      serverLogger.error(bind + ' is already in use');
      process.exit(1);
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr?.port;
  serverLogger.info('Listening on ' + bind);
}