import { connectToDatabase } from 'util/mongodb';
import Joi from 'joi';

const schema = Joi.object({
  title: Joi.string().required(),
  userid: Joi.string().required(),
  username: Joi.string().required(),
  userimage: Joi.string().required(),
  logo: Joi.string().required(),
  link: Joi.string().required(),
  description: Joi.string().required(),
  technology: Joi.array().items(Joi.string())
});

const createProject = async (payload) => {
  console.log(payload, 'payload in services/create');
  const { db } = await connectToDatabase();
  // eslint-disable-next-line prettier/prettier
  const { title, userid, username, userimage, logo, link, description, technology } = await schema.validateAsync(payload);

  const event = await db.collection('projects').insertOne({
    title,
    userid,
    username,
    userimage,
    logo,
    link,
    description,
    technology
  });

  return event;
};

export default createProject;
