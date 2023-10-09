import { Service } from 'typedi';
import { IPost, Post } from '@models/post';

@Service()
export class PostService {
  public findAll() {
    return Post.find().exec();
  }

  public findById(id: string) {
    return Post.findById(id).exec();
  }

  public create(post: IPost) {
    return Post.create(post);
  }

  public updateById(id: string, post: Partial<IPost>) {
    return Post.findByIdAndUpdate(id, { $set: post }).exec();
  }

  public deleteById(id: string) {
    return Post.findByIdAndDelete(id).exec();
  }
}
