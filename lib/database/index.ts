import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env'
  );
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

export const connectToDatabase = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: true, // Changed to true
      dbName: 'sunsetparis',
      maxPoolSize: 10,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts);
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
};

// Add this function to ensure connection is ready
export const ensureDatabaseConnection = async () => {
  try {
    const conn = await connectToDatabase();
    // Wait for connection to be ready
    await new Promise((resolve) => {
      if (conn.connection.readyState === 1) {
        resolve(true);
      } else {
        conn.connection.once('connected', resolve);
      }
    });
    return conn;
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
};
