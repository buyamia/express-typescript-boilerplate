import { NextFunction, Request, Response } from 'express';

export enum RequestMethod {
  GET = 0,
  POST,
  PUT,
  PATCH,
  DELETE,
}

export interface ExpressMiddlewareInterface {
  use(req: Request, res: Response, next: NextFunction): any;
}

export type Type<C extends object = object> = new (...args: any) => C;