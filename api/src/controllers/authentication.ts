import bcrypt from 'bcrypt';
import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

import User from '../models/User';
import UserToken from '../models/UserToken';
import { generateTokens } from '../utils/authentication';
import config from '../utils/config';

export const createUser: RequestHandler = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).send('Username and Password are required');
  if (await User.exists({ userName: username })) {
    res.status(400).send('This usernmae is already reserved');
    return;
  }
  const hash = await bcrypt.hash(password, 10);
  await User.create({ userName: username, passwordHash: hash });
  return res.status(201).send('User registration succesful');
};

export const handleLogin: RequestHandler = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).send('Username and Password are required');
  const user = await User.findOne({ userName: username });
  if (!user) return res.status(401).send('Invalid username or password');
  const passwordCheck = await bcrypt.compare(password, user.passwordHash);
  if (!passwordCheck) return res.status(401).send('Invalid username or password');
  const { accessToken, refreshToken } = await generateTokens(user);
  return res.json({ accessToken, refreshToken });
};

export const getNewAccessToken: RequestHandler = async (req, res) => {
  const { refreshToken } = req.body;
  try {
    const userToken = await UserToken.findOne({ token: refreshToken });
    if (!userToken) return res.status(400).send('User not found');
    const { id } = jwt.verify(refreshToken, config.rtSecret) as { id: string };
    const accessToken = jwt.sign({ id }, config.atSecret, { expiresIn: config.atLifeTime });
    res.send(accessToken);
  } catch (error) {
    res.status(401).send('Invalid refresh token');
  }
};

export const deleteUserToken: RequestHandler = async (req, res) => {
  const { refreshToken } = req.body;
  await UserToken.findOneAndDelete({ token: refreshToken });
  res.send('Logged out successfully');
};
