import crypto from 'crypto'
import { v4 as uuidv4 } from 'uuid'

/**
 * User methods. The example doesn't contain a DB, but for real applications you must use a
 * db here, such as MongoDB, Fauna, SQL, etc.
 */

const users = [
  {
    id: '3946ec99-dd5d-4e63-b688-71cfac65b81f',
    createdAt: 1621182149148,
    fullName: 'admin',
    username: 'admin@gmail.com',
    hash: 'c9c1b5b534dabeb610f9f4c140f33483fbd546490a7d2affdb7ec83d3fc05e5a6ea5247e588c385b600308d2125c2df62978a635b27cd9a823e929f37bd0cd6a',
    salt: '5ee080cc70d7423b54f905323ce927bc'
  }
];

export async function createUser({ fullName, username, password }) {
  // Here you should create the user and save the salt and hashed password (some dbs may have
  // authentication methods that will do it for you so you don't have to worry about it):
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex')
  const user = {
    id: uuidv4(),
    createdAt: Date.now(),
    fullName,
    username,
    hash,
    salt,
  }

  // This is an in memory store for users, there is no data persistence without a proper DB
  users.push(user)
  console.log("create user", users)
  return { fullName, createdAt: Date.now() }
}

// Here you should lookup for the user in your DB
export async function findUser({ username }) {
  const { user } = req; 
  console.log("users", username, users)
  // This is an in memory store for users, there is no data persistence without a proper DB
  return users.find((user) => user.username === username)
}

// Compare the password of an already fetched user (using `findUser`) and compare the
// password for a potential match
export function validatePassword(user, inputPassword) {
  const inputHash = crypto
    .pbkdf2Sync(inputPassword, user.salt, 1000, 64, 'sha512')
    .toString('hex')
  const passwordsMatch = user.hash === inputHash
  return passwordsMatch
}