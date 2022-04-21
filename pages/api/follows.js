import { connectToDatabase } from 'util/mongodb';
import { ObjectId } from 'mongodb';

export default async (req, res) => {
  const { db } = await connectToDatabase();

  switch (req.method) {
    case 'GET': {
      const userid = req.query.userid;
      const data = await db.collection('users').find({ userid: userid }).sort({ _id: 1 }).toArray();
      res.json(data);

      break;
    }
    case 'PATCH': {
      try {
        const payload = req.body;
        const id1 = ObjectId(req.query.currentUser); //current user (this one who click follow, add to followers)
        const id2 = ObjectId(req.query.selectedUser); //user who was selected and add to followed
        const filterFollowed = { _id: id1 };
        const filterFollowers = { _id: id2 };
        const updateFollowed = {
          $set: {
            followed: payload.followed //user who was selected
          }
        };
        const updateFollowers = {
          $set: {
            followers: payload.followers //current user (this one who click follow)
          }
        };

        const options = { upsert: true };
        await db.collection('users').updateOne(filterFollowed, updateFollowed, options);
        const data = await db
          .collection('users')
          .updateOne(filterFollowers, updateFollowers, options);
        res.status(200).json({ status: 'edit user', data });
      } catch (error) {
        res.status(422).json({ status: 'not_created', error: error.message });
      }
      break;
    }

    default:
      res.status(400);
  }
};
