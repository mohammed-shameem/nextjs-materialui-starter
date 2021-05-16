import { createUser } from '../../lib/user'
import { removeTokenCookie } from '../../lib/auth-cookies';

export default async function signup(req, res) {
  try {
    removeTokenCookie(res)
    res.status(200).send({ done: true })
  } catch (error) {
    console.error(error)
    res.status(500).end(error.message)
  }
}