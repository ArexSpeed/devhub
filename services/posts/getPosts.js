import { connectToDatabase } from 'util/mongodb';
import { ObjectId } from 'mongodb';

export const getPost = async (id) => {
  const { db } = await connectToDatabase();
  const post = await db
    .collection('posts')
    .find({ _id: ObjectId(id) })
    .sort({ _id: 1 })
    .toArray();
  console.log(post, 'post getPost');

  return post[0];
};

export const getPosts = async () => {
  const { db } = await connectToDatabase();
  const posts = await db.collection('posts').find().sort({ _id: 1 }).toArray();

  return posts;
};
