
import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb+srv://yaakovgrinboim_db_user:LR9xWtX1aZwyMmGW@cluster0.zu5ny2i.mongodb.net");

try {
  await client.connect();
  console.log("DB connected.");
} catch (e) {
  console.log("Failed connect to DB", e);
  process.exit(1);
}
export const db = client.db("momo");
export default client;




// users.dal.js file:

import { db } from "../db/db.js";
const COLLECTION = db.collection("users");
import { ObjectId } from "mongodb";

async function getAllUsers() {
  try {
    return await COLLECTION.find().toArray();
  } catch (e) {
    console.error(e);
  }
}
async function getById(_id) {
  try {
    return await COLLECTION.findOne({ _id: new ObjectId(_id) });
  } catch (e) {
    console.error(e);
  }
}

async function createUser(user) {
  try {
    const res = await COLLECTION.insertOne(user);
    user._id = res.insertedId;
    return user;
  } catch (e) {
    console.error(e);
  }
}
async function deleteUser(_id) {
  try {
    return await COLLECTION.deleteOne({ _id: new ObjectId(_id) });
  } catch (e) {
    console.error(e);
  }
}
async function updateUser(_id, newData) {
  try {
    return await COLLECTION.updateOne(
      { _id: new ObjectId(_id) },
      {
        $set: newData,
      },
    );
  } catch (e) {
    console.error(e);
  }
}