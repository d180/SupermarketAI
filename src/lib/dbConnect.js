import mongoose from 'mongoose';

let cached = global.mongoose || { conn: null, promise: null };
global.mongoose = cached;

export async function dbConnect() {
  if (cached.conn) return cached.conn;

  const uri = process.env.MONGODB_URI;           // <-- read here (not at top-level)
  if (!uri) throw new Error('Please define the MONGODB_URI environment variable inside .env');

  if (!cached.promise) {
    const opts = { bufferCommands: false };
    cached.promise = mongoose.connect(uri, opts).then((m) => m);
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
