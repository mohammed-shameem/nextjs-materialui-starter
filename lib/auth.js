import Iron from '@hapi/iron'
import { MAX_AGE, setTokenCookie, getTokenCookie } from './auth-cookies'

const TOKEN_SECRET = process.env.TOKEN_SECRET || "this-is-a-secret-value-with-at-least-32-characters";

export async function setLoginSession(res, session) {
  const createdAt = Date.now()
  // Create a session object with a max age that we can validate later
  const obj = { ...session, createdAt, maxAge: MAX_AGE }

  const token = await Iron.seal(obj, TOKEN_SECRET, Iron.defaults)

  setTokenCookie(res, token)
}

export async function getLoginSession(req, res, next) {
  
  try {
    const token = getTokenCookie(req)

    if (!token) throw new Error('Session expired');

    const session = await Iron.unseal(token, TOKEN_SECRET, Iron.defaults)
    const expiresAt = session.createdAt + session.maxAge * 1000

    // Validate the expiration date of the session
    if (Date.now() > expiresAt) throw new Error('Session expired');
    req.user = JSON.parse(JSON.stringify(session));
    return next();
  } catch {
    return res.status(401).send({ message: 'Unauthorized: invalid or expired token' });
  }

}