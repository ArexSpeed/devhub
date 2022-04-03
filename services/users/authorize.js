import { connectToDatabase } from 'util/mongodb';
import Joi from 'joi';
import crypto from 'crypto';

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

const authorizeUser = async (payload) => {
  console.log('authorizeUser in services');
  const { db } = await connectToDatabase();
  const { email, password } = await schema.validateAsync(payload);

  const user = await db.collection('users').findOne({ email: email });

  console.log(user, 'user in services');
  if (!user) {
    return null;
  }

  const passwordHash = crypto
    .pbkdf2Sync(password, user.passwordSalt, 1000, 64, `sha512`)
    .toString(`hex`);
  console.log('after hash');
  if (passwordHash !== user.passwordHash) {
    return null;
  }

  return {
    id: user._id,
    email: user.email,
    name: user.name,
    image: user.imageUrl
  };
};

export default authorizeUser;
