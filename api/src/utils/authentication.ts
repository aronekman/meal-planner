import jwt from 'jsonwebtoken';

import { IUser } from '../models/User';
import UserToken from '../models/UserToken';

export const generateTokens = async (user: IUser) => {
  const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET ?? '', { expiresIn: '5m' });
  const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET ?? '', { expiresIn: '1d' });
  await UserToken.findOneAndDelete({ userId: user._id });
  await UserToken.create({ userId: user._id, token: refreshToken });
  return { accessToken, refreshToken };
};

export const verifyRefreshToken = async (refreshToken: string) => {
  const userToken = await UserToken.findOne({ token: refreshToken });
  if (!userToken) throw Error();
  return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET ?? '');
};
