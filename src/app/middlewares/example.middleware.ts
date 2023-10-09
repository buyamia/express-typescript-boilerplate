import { NextFunction, Request, Response } from 'express';
import { ExpressMiddlewareInterface } from 'routing-controllers';

export interface ExampleRequest extends Request {
  additionalData: string;
}

export class ExampleMiddleware implements ExpressMiddlewareInterface {
  use(req: ExampleRequest, res: Response, next: NextFunction) {
    req.additionalData = 'some thing';
    next();
  }
}