import { NextFunction, Response } from 'express';
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';
import { Service } from 'typedi';
import { ExampleRequest } from '@middlewares/example.middleware';

@Service()
@Middleware({ type: 'before' })
export class GlobalExampleMiddleware implements ExpressMiddlewareInterface {
  use(req: ExampleRequest, res: Response, next: NextFunction) {
    console.log('global middleware is called');
    next();
  }
}