import nc from 'next-connect';
import { removeTokenCookie } from '../../lib/auth-cookies';

export default nc()
  .post(async (req, res) => {
    try {
      removeTokenCookie(res)
      return res.status(200).send({ done: true })
    } catch (error) {
      console.error(error)
      return res.status(500).end(error.message)
    }
  });