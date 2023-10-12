import { defaultMetadataStorage } from 'class-transformer/cjs/storage';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import cors from 'cors';
import { Application, Handler } from 'express';
import helmet from 'helmet';
import {
  getMetadataArgsStorage,
  useContainer,
  useExpressServer,
} from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import * as swaggerUiExpress from 'swagger-ui-express';
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

  useContainer(Container);

  const routingControllersOpts = {
    controllers: controllers,
    middlewares: middlewares,
    defaultErrorHandler: false,
  };

  useExpressServer(app, routingControllersOpts);

  // serve openapi
  const schemas = validationMetadatasToSchemas({
    classTransformerMetadataStorage: defaultMetadataStorage,
    refPointerPrefix: '#/components/schemas/',
  });
  const spec = routingControllersToSpec(
    getMetadataArgsStorage(),
    routingControllersOpts,
    {
      components: {
        schemas: schemas as any,
        securitySchemes: {
          basicAuth: {
            scheme: 'basic',
            type: 'http',
          },
        },
      },
      info: {
        description: 'Generated with `routing-controllers-openapi`',
        title: 'A sample API',
        version: '1.0.0',
      },
    },
  );

  app.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(spec));
};
