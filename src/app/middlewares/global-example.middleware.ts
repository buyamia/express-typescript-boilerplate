import { ExpressMiddlewareInterface } from '@lib/router';
import { ExampleRequest } from '@middlewares/example.middleware';
import { NextFunction, Response } from 'express';

export class GlobalExampleMiddleware implements ExpressMiddlewareInterface {
  use(req: ExampleRequest, res: Response, next: NextFunction) {
    console.log('global middleware is called');
    next();
  }
}