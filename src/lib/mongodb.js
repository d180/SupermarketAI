// src/lib/mongodb.js
import { MongoClient } from 'mongodb';

// cache across hot reloads in dev and across route invocations
let cached = globalThis._mongo || { client: null, promise: null, db: null };
globalThis._mongo = cached;

export async function connectToDatabase() {
  // return cached connection if available
  if (cached.client && cached.db) {
    return { client: cached.client, db: cached.db };
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('Missing MONGODB_URI'); // <-- checked only when actually called
  }

  // choose DB name: MONGODB_DB env > name in URI path > 'test'
  const envDb = process.env.MONGODB_DB;
  const uriDb = (() => {
    try {
      const u = new URL(uri);
      return u.pathname?.replace(/^\//, '') || '';
    } catch {
      return '';
    }
  })();
  const dbName = envDb || uriDb || 'test';

  if (!cached.promise) {
    const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });
    cached.promise = client.connect();
  }

  const client = await cached.promise;
  const db = client.db(dbName);

  cached.client = client;
  cached.db = db;

  return { client, db };
}
