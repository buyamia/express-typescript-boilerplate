import mongoose, { Schema, model } from 'mongoose';

export interface IPost {
  title: string;
  content: string;
  authorId: mongoose.Schema.Types.ObjectId;
}

export const postSchema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    authorId: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  { collection: 'Posts' },
);

export const Post = model<IPost>('Post', postSchema);
