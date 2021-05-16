import { getLoginSession } from '../../lib/auth'
import { findUser } from '../../lib/user'

export default async function user(req, res) {
  try {
    const session = await getLoginSession(req, res)
    const user = (session && (await findUser(session))) ?? null
    res.status(200).json({ user })
  } catch (error) {
    console.error(error)
    res.status(401).json({ errors: ['Authentication token is invalid, please log in']});
  }
}