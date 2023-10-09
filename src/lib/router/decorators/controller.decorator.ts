import { Handler } from 'express';
import { Service } from 'typedi';

import { ExpressClass, getMeta } from '../meta';

export interface ControllerOptions {
  path?: string;
  middlewares?: Array<Handler | Function>;
}

export function Controller(): ClassDecorator;
export function Controller(path: string): ClassDecorator;
export function Controller(pathOrOptions: string | ControllerOptions): ClassDecorator;

export function Controller(pathOrOptions?: string | ControllerOptions): ClassDecorator {
  return (target: Function) => {
    const meta = getMeta(target.prototype as ExpressClass);
    meta.path = '/';

    if (typeof pathOrOptions === 'string') {
      meta.path = pathOrOptions;
    } else if (typeof pathOrOptions === 'object') {
      meta.path = pathOrOptions.path ?? '/';
      if (pathOrOptions.middlewares) {
        meta.middlewares = pathOrOptions.middlewares ?? [];
      }
    }

    Service()(target);
  };
}
