import cors from 'cors';
import express, { Application, Handler } from 'express';
import helmet from 'helmet';

import * as morgan from '@lib/logger/morgan';
import { Type, registerControllers } from '@lib/router';

export interface ExpressLoaderArgs {
  app: Application;
  controllers: Type[];
  middlewares?: Handler[];
}

export default ({ app, controllers, middlewares }: ExpressLoaderArgs) => {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  if (middlewares && middlewares.length) {
    app.use(...middlewares);
  }

  registerControllers(app, controllers);
};
