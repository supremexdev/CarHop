import { MongoClient } from 'mongodb';

const uri = import.meta.env.VITE_MONGODB_URI;
let client;
let clientPromise;

if (!uri) {
  throw new Error('Please add your Mongo URI to .env');
}

if (!client) {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;