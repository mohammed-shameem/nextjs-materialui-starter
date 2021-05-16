import mongoose from 'mongoose';

global.mongo = global.mongo || {};

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

export default async function database(req, res, next) {
  if (!global.mongo.client) {
    global.mongo.client = await mongoose.connect(`${process.env.MONGO_URL}/myApp`, options);
  }
  return next();
}