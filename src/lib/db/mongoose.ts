import mongoose from 'mongoose';

type MongooseCache = {
  cached: typeof mongoose;
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Mongoose> | null;
};

declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

// MongoDB connection string - use environment variable in production
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/adlib-website';

// Creating a cached connection for improved performance in serverless environments
const cached: MongooseCache = global.mongoose ?? {
  cached: mongoose,
  conn: null,
  promise: null,
};

// Initialize global mongoose if not exists
if (!global.mongoose) {
  global.mongoose = cached;
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

  const mongooseInstance: typeof mongoose = await cached.promise;
  cached.conn = mongooseInstance.connection;
  return cached.conn;
}

export default connectToDatabase;