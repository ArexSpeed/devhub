import { connectToDatabase } from 'util/mongodb';

export const createFollow = async (payload) => {
  const { db } = await connectToDatabase();
  const { userid, followed } = payload;

  const follow = await db.collection('follows').insertOne({
    userid,
    followed
  });

  return follow;
};
