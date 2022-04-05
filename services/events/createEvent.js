import { connectToDatabase } from 'util/mongodb';
import Joi from 'joi';

const schema = Joi.object({
  title: Joi.string().required(),
  userid: Joi.string().required(),
  username: Joi.string().required(),
  userimage: Joi.string().required(),
  date: Joi.string().required(),
  duration: Joi.string().required(),
  tags: Joi.array().items(Joi.string())
});

const createEvent = async (payload) => {
  const { db } = await connectToDatabase();
  // eslint-disable-next-line prettier/prettier
  const { title, userid, username, userimage, date, duration, tags } = await schema.validateAsync(payload);
  const event = await db.collection('events').insertOne({
    title,
    userid,
    username,
    userimage,
    date,
    duration,
    tags,
    participants: []
  });

  return event;
};

export default createEvent;
