import { RequestMethod } from '@lib/router/types';

export interface Route {
  method: RequestMethod;
  path: string;
  middlewares: Function[];
}

export interface MethodMeta {
  routes: Route[];
}

export interface ExpressMeta {
  path: string;

  routes: {
    [methodName: string]: MethodMeta;
  };

  middlewares: Function[];
}

export interface ExpressClass {
  __express_meta__: ExpressMeta;
}

export function getMeta(target: ExpressClass) {
  if (!target.__express_meta__) {
    target.__express_meta__ = {
      path: '/',
      routes: {},
      middlewares: [],
    };
  }
  return target.__express_meta__;
}