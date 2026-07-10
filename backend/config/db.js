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
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
