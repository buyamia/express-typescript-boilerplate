import { IUser } from '@models/user';
import { AuthService } from '@services/auth.service';
import { NextFunction, Request, Response } from 'express';
import { HydratedDocument } from 'mongoose';
import { ExpressMiddlewareInterface } from 'routing-controllers';
import { Service } from 'typedi';

export interface AuthRequest extends Request {
  user: HydratedDocument<IUser>;
}

@Service()
export class JwtAuthMiddleware implements ExpressMiddlewareInterface {
  constructor(
    private authService: AuthService,
  ) {}

  async use(req: AuthRequest, res: Response, next: NextFunction) {
    const authorization = req.headers['authorization'];
    if (!authorization) {
      return res.status(401).json({ message: 'Unauthorized access.' });
    }

    const prefix = 'Bearer ';
    const token = authorization.substring(prefix.length);

    const user = await this.authService.verifyToken(token);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized access.' });
    }

    req.user = user;
    next();
  }
}