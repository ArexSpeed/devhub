import { connectToDatabase } from 'util/mongodb';
import Joi from 'joi';

const schema = Joi.object({
  date: Joi.string().required(),
  duration: Joi.string().required(),
  title: Joi.string().required(),
  tags: Joi.array().items(Joi.string())
});

const createEvent = async (payload) => {
  console.log(payload, 'payload in services/create');
  const { db } = await connectToDatabase();
  // eslint-disable-next-line prettier/prettier
  const { date, duration, title, tags } = await schema.validateAsync(payload);

  const event = await db.collection('events').insertOne({
    date,
    duration,
    title,
    tags
  });

  return event;
};

export default createEvent;
