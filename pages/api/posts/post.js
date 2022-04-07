import { connectToDatabase } from 'util/mongodb';
import createPost from 'services/posts/createPost';
//import { getSession } from 'next-auth/client';
import { ObjectId } from 'mongodb';

export default async (req, res) => {
  const { db } = await connectToDatabase();

  switch (req.method) {
    case 'GET': {
      console.log('postid', req.query);
      const id = ObjectId(req.query.id);
      const data = await db.collection('posts').find({ _id: id }).sort({ _id: 1 }).toArray();
      res.json(data);

      break;
    }
    case 'PUT': {
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
    // case 'DELETE': {
    //   //add session when post page add will work
    //   // const session = await getSession({ req });
    //   // if (!session) {
    //   //   return res.status(401).json({ error: 'not_authorized' });
    //   // }
    //   try {
    //     const post = await deletePost();
    //     res.status(200).json({ status: 'deleted', post });
    //   } catch (error) {
    //     res.status(422).json({ status: 'not_deleted', error });
    //   }
    //   break;
    // }

    default:
      res.status(400);
  }
};
