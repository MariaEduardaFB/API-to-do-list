const { MongoClient } = require('mongodb');
require('dotenv').config();

const url = process.env.MONGODB_URI;

const connectToMongoDB = async () => {
    try {
      const client = new MongoClient(url);
      await client.connect();
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB: ', error);
      throw error;
    }
  };

module.exports = { connectToMongoDB };
