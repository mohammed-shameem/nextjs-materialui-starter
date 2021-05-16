import Local from 'passport-local'
import crypto from 'crypto';
import { getUser } from '../db/';

export function validatePassword(user, inputPassword) {
  const inputHash = crypto
    .pbkdf2Sync(inputPassword, user.salt, 1000, 64, 'sha512')
    .toString('hex')
  const passwordsMatch = user.hash === inputHash
  return passwordsMatch
}

export const localStrategy = new Local.Strategy(function (
  username,
  password,
  done
) {
  getUser({ username })
    .then((user) => {
      if (user && validatePassword(user, password)) {
        done(null, user)
      } else {
        done(new Error('Invalid email and password combination'))
      }
    })
    .catch((error) => {
      done(error)
    })
});