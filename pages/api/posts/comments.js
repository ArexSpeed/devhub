import { connectToDatabase } from 'util/mongodb';
import { ObjectId } from 'mongodb';

export default async (req, res) => {
  const { db } = await connectToDatabase();

  switch (req.method) {
    case 'GET': {
      const postid = req.query.postid;
      const data = await db
        .collection('posts')
        .find({ _id: ObjectId(postid) })
        .sort({ _id: 1 })
        .toArray();
      res.json(data[0].comments);

      break;
    }
    case 'PATCH': {
      try {
        const payload = req.body;
        console.log(payload, 'comment payload');
        console.log(req.query.postid, 'comment query');
        const id = ObjectId(req.query.postid);
        const filter = { _id: id };
        const update = {
          $set: {
            comments: payload.comments
          }
        };

        const options = { upsert: true };
        const data = await db.collection('posts').updateOne(filter, update, options);
        res.status(200).json({ status: 'comment added', data });
      } catch (error) {
        res.status(422).json({ status: 'not_created', error: error.message });
      }
      break;
    }

    default:
      res.status(400);
  }
};
