import { connectToDatabase } from 'util/mongodb';
import Joi from 'joi';
import crypto from 'crypto';

const schema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  password: Joi.string().required(),
  position: Joi.string().required()
  //languages: Joi.array().items(Joi.string()),
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
  const { email, name, password, position } = await schema.validateAsync(payload);
  await checkUserExist(email);

  const passwordSalt = crypto.randomBytes(16).toString('hex');
  const passwordHash = crypto
    .pbkdf2Sync(password, passwordSalt, 1000, 64, `sha512`)
    .toString(`hex`);
  // eslint-disable-next-line prettier/prettier
  const blankImage ='https://res.cloudinary.com/dbpsxmtcb/image/upload/v1648748926/umcedkder4e0nxragcdg.png';
  const blankSocial = [
    { name: 'website', link: '' },
    { name: 'facebook', link: '' },
    { name: 'linkedin', link: '' },
    { name: 'twitter', link: '' },
    { name: 'github', link: '' },
    { name: 'dribbble', link: '' }
  ];
  const user = await db.collection('users').insertOne({
    email,
    name,
    imageUrl: blankImage,
    passwordSalt,
    passwordHash,
    position,
    languages: [],
    skills: [],
    about: '',
    socials: blankSocial
  });

  return user;
};

export default create;
