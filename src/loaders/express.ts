import cors from 'cors';
import express, { Application, Handler } from 'express';
import helmet from 'helmet';
import { useContainer, useExpressServer } from 'routing-controllers';
import { Container } from 'typedi';
import * as morgan from '@lib/logger/morgan';

export interface ExpressLoaderArgs {
  app: Application;
  controllers: Function[];
  middlewares?: Array<Handler | Function>;
}

export default ({ app, controllers, middlewares }: ExpressLoaderArgs) => {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  useContainer(Container);

  useExpressServer(app, {
    controllers: controllers,
    middlewares: middlewares,
  });
};
