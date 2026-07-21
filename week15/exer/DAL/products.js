import { getDb } from '../db/mongodb.js';
import { ObjectId } from 'mongodb';

const getCollection = () => getDb().collection('products');

export async function getAll() {
    try {
        return await getCollection().find({}).toArray();
    } catch (error) {
        console.error(error);
    }
}

export async function getById(id) {
    try {
        return await getCollection().findOne({ _id: new ObjectId(id) });
    } catch (error) {
        console.error(error);
    }
}

export async function create(newData) {
    try {
        return await getCollection().insertOne(newData);
    } catch (error) {
        console.error(error);
    }
}

export async function deleteById(id) {
    try {
        return await getCollection().deleteOne({ _id: new ObjectId(id) });
    } catch (error) {
        console.error(error);
    }
}

export async function updateById(id, newData) {
    try {
        return await getCollection().findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: newData },
            { returnDocument: 'after' }
        );
    } catch (error) {
        console.error(error);
    }
}