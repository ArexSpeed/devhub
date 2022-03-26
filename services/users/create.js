import { connectToDatabase } from 'util/mongodb';
import Joi from 'joi';
import crypto from 'crypto';

const schema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  password: Joi.string().required(),
  imageUrl: Joi.string(),
  position: Joi.string().required(),
  languages: Joi.array().items(Joi.string()),
  skills: Joi.array().items(Joi.string())
});

const checkUserExist = async (email) => {
  console.log('check exists');
  const { db } = await connectToDatabase();
  const existingUserEmail = await db.collection('users').findOne({ email: email });
  console.log(existingUserEmail, 'exist email');
  if (existingUserEmail) {
    throw new Error('This user is exists');
  }
};

const create = async (payload) => {
  console.log(payload, 'payload in services/create');
  const { db } = await connectToDatabase();
  // eslint-disable-next-line prettier/prettier
  const { email, name, password, imageUrl, position, languages, skills } = await schema.validateAsync(payload);
  await checkUserExist(email);

  const passwordSalt = crypto.randomBytes(16).toString('hex');
  const passwordHash = crypto
    .pbkdf2Sync(password, passwordSalt, 1000, 64, `sha512`)
    .toString(`hex`);
  const user = await db.collection('users').insertOne({
    email,
    name,
    imageUrl,
    passwordSalt,
    passwordHash,
    position,
    languages,
    skills,
    socials: [{}]
  });

  return user;
};

export default create;
