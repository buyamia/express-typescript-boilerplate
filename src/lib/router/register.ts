import { Application, Handler, NextFunction, Request, Response, Router as ExpressRouter } from 'express';
import Router from 'express-promise-router';
import { Constructable, Container } from 'typedi';

import { ExpressClass, getMeta } from './meta';
import { ExpressMiddlewareInterface, RequestMethod, Type } from './types';
import { addLeadingSlash, isPromiseLike, stripEndSlash } from './utils';

/**
 * Parses routing metadata from controllers and sets up routing.
 */
export function registerControllers(app: Application, controllers: Type[]) {
  const router  = Router();

  controllers.forEach(controller => {
    const controllerInstance = getFromContainer(controller) as ExpressClass;
    const meta = getMeta(controllerInstance);

    const controllerPath = addLeadingSlash(meta.path);
    const controllerMiddlewares = prepareMiddlewares(meta.middlewares);

    for (const [methodName, methodMeta] of Object.entries(meta.routes)) {
      methodMeta.routes.forEach(route => {
        const path = stripEndSlash(controllerPath) + addLeadingSlash(route.path);
        const routeMiddlewares = prepareMiddlewares(route.middlewares);
        const routeHandler = controllerInstance[methodName].bind(controllerInstance);
        const routerRef = getRouterRef(router, route.method).bind(router);

        routerRef(path, ...controllerMiddlewares, ...routeMiddlewares, routeHandler);
      });
    }
  });

  app.use(router);
}

function prepareMiddlewares(middlewares: Array<Function | Handler>) {
  const prepared: Handler[] = [];
  middlewares.forEach(mw => {
    if (mw.prototype && mw.prototype.use) {
      // if middleware implements ExpressMiddlewareInterface
      Object.defineProperty(mw, 'name', {
        value: mw.constructor.name,
        writable: true,
      });

      prepared.push((request: Request, response: Response, next: NextFunction) => {
        const mwInstance = getFromContainer<ExpressMiddlewareInterface>(mw as Constructable<any>)

        const res = mwInstance.use(request, response, next);
        if (isPromiseLike(res)) {
          res.catch(next);
        }

        return res;
      });
    } else {
      // else if middleware is a function
      prepared.push(mw as Handler);
    }
  });

  return prepared;
}

function getRouterRef(router: ExpressRouter, requestMethod: RequestMethod) {
  switch (requestMethod) {
    case RequestMethod.POST:
      return router.post;
    case RequestMethod.DELETE:
      return router.delete;
    case RequestMethod.PUT:
      return router.put;
    case RequestMethod.PATCH:
      return router.patch;
    case RequestMethod.GET:
      return router.get;
    default: {
      return router.use;
    }
  }
}

function getFromContainer<T>(someClass: Constructable<T>): T {
  try {
    if (!Container.has(someClass)) {
      Container.set(someClass, new someClass());
    }

    return Container.get(someClass) as T;
  } catch (err) {
    return new someClass();
  }
}
