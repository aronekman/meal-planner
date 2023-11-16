import jwt from 'jsonwebtoken';

import { IUser } from '../models/User.js';
import UserToken from '../models/UserToken.js';
import config from './config.js';

export const generateTokens = async (user: IUser) => {
  const accessToken = jwt.sign({ id: user._id }, config.atSecret, { expiresIn: config.atLifeTime });
  const refreshToken = jwt.sign({ id: user._id }, config.rtSecret, { expiresIn: config.rtLifeTime });
  await UserToken.findOneAndDelete({ userId: user._id });
  await UserToken.create({ userId: user._id, token: refreshToken });
  return { accessToken, refreshToken };
};
