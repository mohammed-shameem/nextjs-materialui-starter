
import Iron from '@hapi/iron'
import { getTokenCookie } from '../lib/auth-cookies'

const TOKEN_SECRET = process.env.TOKEN_SECRET || "this-is-a-secret-value-with-at-least-32-characters";

export default async function getLoginSession(req, res, next) {
  
  try {
    const token = getTokenCookie(req)

    if (!token) throw new Error('Session expired');

    const session = await Iron.unseal(token, TOKEN_SECRET, Iron.defaults)
    const expiresAt = session.createdAt + session.maxAge * 1000
    // Validate the expiration date of the session
    if (Date.now() > expiresAt) throw new Error('Session expired');
    req.user = session;
    return next();
  } catch(err) {
    console.log("err", err)
    return res.status(401).send({ message: 'Unauthorized: invalid or expired token' });
  }
}