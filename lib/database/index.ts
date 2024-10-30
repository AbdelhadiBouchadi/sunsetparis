import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
  if (!MONGODB_URI) throw new Error('MONGODB_URI is missing');

  try {
    // Only use cached connection if it's still connected
    if (cached.conn && mongoose.connection.readyState === 1) {
      return cached.conn;
    }

    // If there's no connection or it's disconnected, create a new one
    const opts = {
      dbName: 'sunsetparis',
      bufferCommands: false,
      maxPoolSize: 10, // Adjust based on your needs
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    // Clear existing promise if connection is not active
    if (cached.conn === null || mongoose.connection.readyState !== 1) {
      cached.promise = null;
    }

    cached.promise = cached.promise || mongoose.connect(MONGODB_URI, opts);
    cached.conn = await cached.promise;

    return cached.conn;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    // Reset cache on connection error
    cached.conn = null;
    cached.promise = null;
    throw error;
  }
};

// Add a function to clear the connection cache if needed
export const clearDatabaseCache = () => {
  cached.conn = null;
  cached.promise = null;
};
