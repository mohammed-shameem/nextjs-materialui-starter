import crypto from 'crypto'
import User from '../models/user';

export async function insertUser({ fullName, username, password }) {

  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex')
  const user = {
    fullName,
    username,
    hash,
    salt,
  }
  return User.create(user);
};

export async function getUser(query) {
  return User.findOne(query).lean();
};

export async function getUsers() {
  return User.find();
};