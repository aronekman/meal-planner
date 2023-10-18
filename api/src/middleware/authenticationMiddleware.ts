import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import User, { IUser } from '../models/User';
import config from '../utils/config';

export interface IUserRequest extends Request {
  user?: IUser;
}

const AuthMiddleware = async (req: IUserRequest, res: Response, next: NextFunction) => {
  const authHeader = req.get('authorization');
  const token = authHeader?.startsWith('Bearer ') && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);
  try {
    const { id } = jwt.verify(token, config.atSecret) as { id: string };
    const user = await User.findOne({ _id: id });
    if (!user) return res.status(400).send('User not found');
    req.user = user;
  } catch (error) {
    return res.sendStatus(401);
  }
  next();
};

export default AuthMiddleware;