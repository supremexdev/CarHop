import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;

// Check if URI exists
if (!uri) {
  console.error('ERROR: MONGODB_URI is not defined in .env file');
  console.error('Please check your .env file exists and contains MONGODB_URI');
  process.exit(1);
}

console.log('Connecting to MongoDB...');
const client = new MongoClient(uri);

// Connect to MongoDB
try {
  await client.connect();
  console.log(' Connected to MongoDB!');
} catch (error) {
  console.error(' Failed to connect to MongoDB:', error.message);
  process.exit(1);
}

const db = client.db("carhop");

// API Routes
app.get('/api/renters', async (req, res) => {
  try {
    const renters = await db.collection("renters").find({}).toArray();
    res.json(renters);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/tenants', async (req, res) => {
  try {
    const tenants = await db.collection("tenants").find({}).toArray();
    res.json(tenants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/vehicles', async (req, res) => {
  try {
    const vehicles = await db.collection("Vehicles").find({}).toArray();
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});