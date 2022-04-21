import { connectToDatabase } from 'util/mongodb';
import Joi from 'joi';

const schemaQuiz = Joi.object({
  quizname: Joi.string().required(),
  level: Joi.string().required(),
  questions: Joi.array().items(Joi.object())
});

const schemaQuestion = Joi.object({

})

const createQuiz = async (payload) => {
  const { db } = await connectToDatabase();
  // eslint-disable-next-line prettier/prettier
  const { quizname, level, questions } = await schemaQuiz.validateAsync(payload);

  const quiz = await db.collection('posts').insertOne({
    quizname,
    level,
    questions
  });

  return quiz;
};

export default createQuiz;
