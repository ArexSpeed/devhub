import { connectToDatabase } from 'util/mongodb';
import { ObjectId } from 'mongodb';

export const getUser = async (id) => {
  const { db } = await connectToDatabase();
  const user = await db
    .collection('users')
    .find({ _id: ObjectId(id) })
    .sort({ _id: 1 })
    .toArray();
  console.log(user, 'user getUser');

  return user[0];
};

export const getUsers = async () => {
  const { db } = await connectToDatabase();
  const users = await db.collection('users').find().sort({ _id: 1 }).toArray();

  return users;
};
