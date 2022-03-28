import { connectToDatabase } from 'util/mongodb';
import { ObjectId } from 'mongodb';
import Joi from 'joi';

const schema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  imageUrl: Joi.string(),
  position: Joi.string().required(),
  languages: Joi.array().items(Joi.string()),
  skills: Joi.array().items(Joi.string())
});

// const checkUserExist = async (email) => {
//   console.log('check exists');
//   const { db } = await connectToDatabase();
//   const existingUserEmail = await db.collection('users').findOne({ email: email });
//   console.log(existingUserEmail, 'exist email');
//   if (existingUserEmail) {
//     throw new Error('This user is exists');
//   }
// };

const update = async (payload, query) => {
  console.log(payload, 'payload in services/update');
  const id = ObjectId(query);
  const { db } = await connectToDatabase();
  // eslint-disable-next-line prettier/prettier
  const { email, name, imageUrl, position, languages, skills } = await schema.validateAsync(payload);
  // await checkUserExist(email);

  const filter = { _id: id };
  const updateDoc = {
    $set: {
      name,
      email,
      imageUrl,
      position,
      languages,
      skills
    }
  };

  const options = { upsert: true };
  const data = await db.collection('users').updateOne(filter, updateDoc, options);

  return data;
};

export default update;
