import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017");

try {
  await client.connect();
  const db = client.db("exemple");
  const collection = db.collection("users");
  const res = await collection.deleteOne(
{ username: "Mmomooshe" }
//   const res = await collection.updateOne(
//     { username: "momo" },
//     {
//       $set: { username: "Mmomooshe" }
//     },
  );
  // .find({_id: new ObjectId('6a5ddd809c26c0fbe3315458') })
  // .toArray();
  //   const res = await collection.insertOne({
  //     username: "Moshe",
  //     id: 30
  //   });
  console.log(res);
} catch (error) {
  console.log("Failed connect to DB", error);
}
