import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URL)
try {
await client.connect()
console.log('DB connected');
} catch (e) {
    console.error(e);
    process.exit(1)
}

export const db = client.db('shop')
export const getDb = () => db;
