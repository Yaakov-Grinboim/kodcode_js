import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017");

try {
  await client.connect();
  console.log("DB connected.");
  
} catch (e) {
  console.log("Failed connect to DB", e);
  process.exit(1)
}
const db = client.db("exemple");
export { db };
export default client;


