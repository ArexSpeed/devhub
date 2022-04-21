import { connectToDatabase } from 'util/mongodb';
import { ObjectId } from 'mongodb';

export default async (req, res) => {
  const { db } = await connectToDatabase();

  switch (req.method) {
    case 'GET': {
      const eventid = req.query.eventid;
      const data = await db
        .collection('events')
        .find({ _id: ObjectId(eventid) })
        .sort({ _id: 1 })
        .toArray();
      res.json(data[0].participants);

      break;
    }
    case 'PATCH': {
      try {
        const payload = req.body;
        console.log(payload, 'like payload');
        console.log(req.query.eventid, 'like query');
        const id = ObjectId(req.query.eventid);
        const filter = { _id: id };
        const update = {
          $set: {
            participants: payload.participants
          }
        };

        const options = { upsert: true };
        const data = await db.collection('events').updateOne(filter, update, options);
        res.status(200).json({ status: 'participants added', data });
      } catch (error) {
        res.status(422).json({ status: 'not_created', error: error.message });
      }
      break;
    }

    default:
      res.status(400);
  }
};
