import { MongoClient } from "mongodb";

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost:27017";

const client = new MongoClient(MONGO_URI);
let db;

export async function connectDB() {
  try {
    await client.db("admin_dashboard");
    console.log("Connected to MongoDB successfully!");
    return db;
  } catch (e) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
}
export function getDB() {
  if (!db) {
    throw new Error("Database not initialized. Call connectDB first.");
  }
  return db;
}