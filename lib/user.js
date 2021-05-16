import crypto from 'crypto'
import { v4 as uuidv4 } from 'uuid'

/**
 * User methods. The example doesn't contain a DB, but for real applications you must use a
 * db here, such as MongoDB, Fauna, SQL, etc.
 */

const users = [
  {
    id: '76270895-5a9a-402d-9460-a5cdd3583911',
    createdAt: 1621025145572,
    fullName: 'm',
    username: 'm@gmail.com',
    hash: '4d1890f98df3d5f079b6a3d0306affecbd244ae00807c23cc1c07975d88a78576c0dab013729c344f1a370cf8732d148dacee3975065212baaaf0cd27a9c0c03',
    salt: '9a672c5e23bb9214ffdf0318c010167f',
    maxAge: 28800
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