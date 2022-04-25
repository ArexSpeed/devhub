import { connectToDatabase } from 'util/mongodb';
import { ObjectId } from 'mongodb';

export const getQuiz = async (id) => {
  const { db } = await connectToDatabase();
  const quiz = await db
    .collection('quizes')
    .find({ _id: ObjectId(id) })
    .sort({ _id: 1 })
    .toArray();

  return quiz[0];
};

export const getQuizzes = async () => {
  const { db } = await connectToDatabase();
  const quizes = await db.collection('quizes').find().sort({ _id: 1 }).toArray();

  return quizes;
};
