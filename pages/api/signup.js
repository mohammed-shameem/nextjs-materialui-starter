import nc from 'next-connect';
import { insertUser } from '../../db';
import database from '../../middlewares/db';

export default nc()
  .use(database)
  .post(async (req, res) => {
    try {
      const { body } = req;
      const user = await insertUser(body);
      return  res.status(200).json({ user });
    } catch (error) {
      console.log("err", error.message)
      return res.status(400).json({ errors: ['Email already exists']});
    }
  });