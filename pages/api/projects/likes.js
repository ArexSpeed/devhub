import { connectToDatabase } from 'util/mongodb';
import { ObjectId } from 'mongodb';

export default async (req, res) => {
  const { db } = await connectToDatabase();

  switch (req.method) {
    case 'GET': {
      const projectid = req.query.projectid;
      const data = await db
        .collection('projects')
        .find({ _id: ObjectId(projectid) })
        .sort({ _id: 1 })
        .toArray();
      res.json(data[0].likes);

      break;
    }
    case 'PATCH': {
      try {
        const payload = req.body;
        console.log(payload, 'like payload');
        console.log(req.query.projectid, 'like query');
        const id = ObjectId(req.query.projectid);
        const filter = { _id: id };
        const update = {
          $set: {
            likes: payload.likes
          }
        };

        const options = { upsert: true };
        const data = await db.collection('projects').updateOne(filter, update, options);
        res.status(200).json({ status: 'likes added', data });
      } catch (error) {
        res.status(422).json({ status: 'not_created', error: error.message });
      }
      break;
    }

    default:
      res.status(400);
  }
};
