import { Service } from 'typedi';
import { IUser, User } from '@models/user';

@Service()
export class UserService {
  public findAll() {
    return User.find().exec();
  }

  public findById(id: string) {
    return User.findById(id).exec();
  }

  public create(post: IUser) {
    return User.create(post);
  }

  public updateById(id: string, post: Partial<IUser>) {
    return User.findByIdAndUpdate(id, { $set: post }).exec();
  }

  public deleteById(id: string) {
    return User.findByIdAndDelete(id).exec();
  }
}
