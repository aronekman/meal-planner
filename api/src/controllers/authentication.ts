import bcrypt from 'bcrypt';
import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

import User from '../models/User';
import UserToken from '../models/UserToken';
import { generateTokens, verifyRefreshToken } from '../utils/authentication';

export const createUser: RequestHandler = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).send('Username and Password are required');
  if (await User.exists({ userName: username })) {
    res.status(400).send('This usernmae is already reserved');
    return;
  }
  const hash = await bcrypt.hash(password, 10);
  await User.create({ userName: username, passwordHash: hash });
  return res.status(201).send('User registration succesfull');
};

export const handleLogin: RequestHandler = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).send('Username and Password are required');
  const user = await User.findOne({ userName: username });
  if (!user) return res.status(401).send('Invalid username or password');
  console.log(password, user.passwordHash);
  const passwordCheck = await bcrypt.compare(password, user.passwordHash);
  if (!passwordCheck) return res.status(401).send('Invalid username or password');
  const { accessToken, refreshToken } = await generateTokens(user);
  return res.json({ accessToken, refreshToken });
};

export const getNewAccessToken: RequestHandler = async (req, res) => {
  const { refreshToken } = req.body;
  try {
    const { id } = (await verifyRefreshToken(refreshToken)) as { id: string };
    const accessToken = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET ?? '', { expiresIn: '5m' });
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
