import { connectToDatabase } from 'util/mongodb';
import Joi from 'joi';
import { Timestamp } from 'mongodb';

const schema = Joi.object({
  userid: Joi.string().required(),
  username: Joi.string().required(),
  userimage: Joi.string().required(),
  image: Joi.string().required(),
  category: Joi.string().required(),
  title: Joi.string().required(),
  excerpt: Joi.string().required(),
  content: Joi.string().required()
});

const createPost = async (payload) => {
  const { db } = await connectToDatabase();
  // eslint-disable-next-line prettier/prettier
  const { userid, username, userimage, image, category, title, excerpt, content } = await schema.validateAsync(payload);

  const post = await db.collection('posts').insertOne({
    userid,
    username,
    userimage,
    image,
    date: new Timestamp(),
    title,
    category,
    excerpt,
    content,
    likes: [],
    comments: []
  });

  return post;
};

export default createPost;
