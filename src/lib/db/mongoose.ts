import mongoose from 'mongoose';

declare global {
  var mongoose: { conn: any; promise: any } | undefined;
}

// MongoDB connection string - use environment variable in production
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/adlib-website';

// Creating a cached connection for improved performance in serverless environments
let cached = global.mongoose || { conn: null, promise: null };

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log('Connected to MongoDB');
        return mongoose;
      })
      .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
        throw error;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDatabase;