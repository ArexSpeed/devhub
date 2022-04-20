import { connectToDatabase } from 'util/mongodb';

export default async (req, res) => {
  const { db } = await connectToDatabase();

  switch (req.method) {
    case 'GET': {
      const data = await db.collection('quizes').find().sort({ _id: 1 }).toArray();
      res.json(data);

      break;
    }
    case 'POST': {
      try {
        const payload = req.body;
        const data = await db.collection('quizes').insertOne(payload);
        res.status(200).json({ status: 'created quiz', data });
      } catch (error) {
        res.status(422).json({ status: 'not_created', error });
      }
      break;
    }

    default:
      res.status(400);
  }
};
