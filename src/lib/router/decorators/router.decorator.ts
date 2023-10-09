import { Handler } from 'express';
import { ExpressClass, ExpressMeta, getMeta, MethodMeta } from '../meta';
import { RequestMethod } from '../types';

export interface RouteOptions {
  path?: string;
  middlewares?: Array<Handler | Function>;
}

function createRoutingDecorator(method: RequestMethod) {
  return (pathOrOptions?: string | RouteOptions): MethodDecorator => {
    return (target: object, propertyKey: string | symbol, descriptor: any): void => {
      const meta = getRouterMeta(target as ExpressClass, propertyKey as string);
      let path = '/';
      let middlewares: Array<Handler | Function> = [];

      if (typeof pathOrOptions === 'string') {
        path = pathOrOptions;
      } else if (typeof pathOrOptions === 'object') {
        if (pathOrOptions.path) path = pathOrOptions.path;
        if (pathOrOptions.middlewares) middlewares = pathOrOptions.middlewares;
      }

      meta.routes.push({ path, method, middlewares });

      return descriptor;
    };
  };
}


export const Get = createRoutingDecorator(RequestMethod.GET);

export const Post = createRoutingDecorator(RequestMethod.POST);

export const Put = createRoutingDecorator(RequestMethod.PUT);

export const Patch = createRoutingDecorator(RequestMethod.PATCH);

export const Delete = createRoutingDecorator(RequestMethod.DELETE);

function getRouterMeta(target: ExpressClass, key: string): MethodMeta {
  const meta: ExpressMeta = getMeta(target);

  return meta.routes[key] = meta.routes[key] || {
    routes: [],
  };
}