import nc from 'next-connect';
import authmiddleware from '../../middlewares/authmiddleware';
import database from '../../middlewares/db';
import { getUser } from '../../db/';

export default nc()
  .use(database)
  .use(authmiddleware)
  .get(async (req, res) => {
    try {
      const { username } = req.user;
      const user = await getUser({ username });
      return  res.status(200).json({ user });
    } catch {
      return res.status(401).json({ errors: ['Authentication token is invalid, please log in']});
    }
  });