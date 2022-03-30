import { getUser } from 'services/users/getUser';

export default async (req, res) => {
  switch (req.method) {
    case 'GET': {
      const data = await getUser(req.query.id);
      res.json(data);
      break;
    }

    default:
      res.status(400);
  }
};
