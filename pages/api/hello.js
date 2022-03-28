import { connectToDatabase } from 'util/mongodb';

export default async (req, res) => {
  const { db } = await connectToDatabase();
  switch (req.method) {
    case 'GET': {
      const data = await db.collection('hello').find().sort({ _id: 1 }).toArray();
      res.json(data);

      break;
    }

    default:
      res.status(400);
  }
};
