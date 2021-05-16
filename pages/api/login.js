import passport from 'passport'
import nc from 'next-connect';
import { localStrategy } from '../../lib/passport-local';
import { setLoginSession } from '../../lib/auth'
import database from '../../middlewares/db';

const authenticate = (method, req, res) =>
  new Promise((resolve, reject) => {
    passport.authenticate(method, { session: false }, (error, token) => {
      if (error) {
        reject(error)
      } else {
        resolve(token)
      }
    })(req, res)
  })

passport.use(localStrategy)

export default nc()
  .use(database)
  .use(passport.initialize())
  .post(async (req, res) => {
    try {
      const user = await authenticate('local', req, res);
      // session is the payload to save in the token, it may contain basic info about the user
      const session = { ...user }
      await setLoginSession(res, session)
      return res.status(200).send({ done: true })
    } catch (error) {
      console.error(error)
      return res.status(401).json({ errors: [error.message]});
    }
  });