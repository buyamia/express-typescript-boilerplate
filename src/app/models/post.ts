import { Schema, model } from 'mongoose';

export interface IPost {
  title: string;
  content: string;
}

export const postSchema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  { collection: 'Posts' },
);

export const Post = model<IPost>('Post', postSchema);
