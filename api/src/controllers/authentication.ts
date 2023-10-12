import bcrypt from 'bcrypt';
import { RequestHandler } from 'express';

import User from '../models/User';

export const createUser: RequestHandler = async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  if (await User.exists({ userName: username })) {
    res.status(400).send('This usernmae is already reserved');
    return;
  }
  const hash = await bcrypt.hash(password, 10);
  User.create({ userName: username, password_hash: hash });
  return res.status(201).send('User registration succesfull');
};
