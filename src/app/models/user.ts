import { Schema, model } from 'mongoose';

export interface IUser {
  name: string;
  username: string;
  password: string;
}

export const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    collection: 'Users',
    toJSON: {
      transform: (_doc, ret) => {
        delete ret.password;
        return ret;
      },
    },
  },
);

export const User = model<IUser>('User', userSchema);
