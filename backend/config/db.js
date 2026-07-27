const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const options = {
      maxPoolSize: parseInt(process.env.MONGO_MAX_POOL_SIZE) || 200,
      minPoolSize: parseInt(process.env.MONGO_MIN_POOL_SIZE) || 10,
      socketTimeoutMS: 45000,
      serverSelectionTimeoutMS: 5000,
      heartbeatFrequencyMS: 10000,
    };

    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/etizone1', options);
    console.log(`MongoDB Connected: ${conn.connection.host} (Pool limit: ${options.maxPoolSize})`);

    // Clean up old Categories collection to fix index build errors due to duplicate legacy seeds
    try {
      const collections = await conn.connection.db.listCollections({ name: 'categories' }).toArray();
      if (collections.length > 0) {
        await conn.connection.db.collection('categories').drop();
        console.log('🧹 Cleaned up legacy categories collection to rebuild indexes.');
      }
    } catch (dropErr) {
      console.warn('Could not drop categories collection:', dropErr.message);
    }
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
