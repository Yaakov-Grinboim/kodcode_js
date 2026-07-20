import { db } from "../db/db.js";
const COLLECTIO = db.collection("users");
import { ObjectId } from "mongodb";

async function getAllUsers() {
  try {
    return await COLLECTIO.find().toArray();
  } catch (error) {
    console.error(error);
  }
}
async function getById(_id) {
  try {
    return await COLLECTIO.findOne({ _id: new ObjectId(_id) });
  } catch (error) {
    console.error(error);
  }
}
async function createUser(user) {
  try {
    const res = await COLLECTIO.insertOne(user);
    user._id = res.insertedId;
    return user;
  } catch (e) {
    console.error(e);
  }
}

async function updateUser(_id, updatedData) {
  try {
    const res = await COLLECTIO.updateOne(
      { _id: new ObjectId(_id) },
      { $set: updatedData }
    );
    return res;
  } catch (error) {
    console.error(error);
  }
}

async function deleteUser(_id) {
  try {
    const res = await COLLECTIO.deleteOne({ _id: new ObjectId(_id) });
    return res;
  } catch (error) {
    console.error(error);
  }
}



export { getAllUsers, getById, createUser, updateUser, deleteUser };

