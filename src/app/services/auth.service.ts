import { config } from '@config';
import { Logger } from '@lib/logger';
import { compare, hash } from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Service } from 'typedi';

import { IUser, User } from '@models/user';

@Service()
export class AuthService {
  private logger = new Logger('AuthService');

  public async login(username: string, password: string) {
    try {
      const user = await User.findOne({ username }).exec();
      if (!user) {
        this.logger.warn('Unable to find user', { username });
        return null;
      }

      const isPasswordCorrect = await compare(password, user.password);
      if (!isPasswordCorrect) {
        this.logger.warn('Password is incorrect', { username });
        return null;
      }

      return jwt.sign(user.toJSON(), config.jwtSecret as string);
    } catch (error) {
      this.logger.warn('Unexpected error', { error });
      return null;
    }
  }

  public async register(name: string, username: string, password: string) {
    const encryptedPassword = await hash(password, 10);
    const user = await User.create({ name, username, password: encryptedPassword });

    return jwt.sign(user.toJSON(), config.jwtSecret as string);
  }
}
