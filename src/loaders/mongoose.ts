import mongoose from 'mongoose';
import { config } from '@config';

export default async () => {
  if (!config.mongoose.url) {
    throw new Error('No database connection url provided');
  }
  const conn = await mongoose.connect(config.mongoose.url, {
    autoIndex: true,
  });

  return conn.connection.db;
};
