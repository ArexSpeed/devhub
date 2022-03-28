import { connectToDatabase } from 'util/mongodb';
import createPost from 'services/posts/createPost';
//import { getSession } from 'next-auth/client';

export default async (req, res) => {
  const { db } = await connectToDatabase();

  switch (req.method) {
    case 'GET': {
      const data = await db.collection('posts').find().sort({ _id: 1 }).toArray();
      res.json(data);

      break;
    }
    case 'POST': {
      try {
        //add session when post page add will work
        // const session = await getSession({ req });
        // if (!session) {
        //   return res.status(401).json({ error: 'not_authorized' });
        // }
        const payload = req.body;
        const data = await createPost(payload);
        res.status(200).json({ status: 'created', data });
      } catch (error) {
        res.status(422).json({ status: 'not_created', error });
      }
      break;
    }

    default:
      res.status(400);
  }
};
