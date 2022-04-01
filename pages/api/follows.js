import { connectToDatabase } from 'util/mongodb';
import { createFollow } from 'services/users/follows';
import { ObjectId } from 'mongodb';

export default async (req, res) => {
  const { db } = await connectToDatabase();

  switch (req.method) {
    case 'GET': {
      const userid = req.query.userid;
      const data = await db
        .collection('follows')
        .find({ userid: userid })
        .sort({ _id: 1 })
        .toArray();
      res.json(data);

      break;
    }
    case 'POST': {
      try {
        const payload = req.body;
        console.log(payload, 'body');
        const data = await createFollow(payload);
        res.status(200).json({ status: 'created', data });
      } catch (error) {
        res.status(422).json({ status: 'not_created', error });
      }
      break;
    }
    case 'PUT': {
      try {
        const queryId = req.query.id;
        const payload = req.body;
        const id = ObjectId(queryId);
        console.log(queryId, 'query user');
        console.log(payload, 'payload put');
        //const data = await update(payload, queryId);
        const filter = { _id: id };
        const updateDoc = {
          $set: {
            name: payload.name,
            email: payload.email,
            imageUrl: payload.imageUrl,
            position: payload.position,
            languages: payload.languages,
            skills: payload.skills,
            about: payload.about,
            socials: payload.socials
          }
        };

        const options = { upsert: true };
        const data = await db.collection('users').updateOne(filter, updateDoc, options);
        //console.log(data, 'find user');
        res.status(200).json({ status: 'edit user', data });
      } catch (error) {
        res.status(422).json({ status: 'not_created', error });
      }
      break;
    }

    default:
      res.status(400);
  }
};
