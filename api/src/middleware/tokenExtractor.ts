import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import User, { IUser } from "../models/User";
import { verifyAccessToken } from "../utils/authentication";

export interface IUserRequest extends Request {
    user? : IUser
}

const tokenExtractor = async (req: IUserRequest, res: Response, next: NextFunction) => {
    const authorization = req.get('authorization')
    if (authorization?.toLowerCase().startsWith('bearer ')) {
        const token = authorization.slice(7)
        const { id } = (await verifyAccessToken(token)) as { id: string };
        const user = await User.findById(id)
        if (!user) {
            return res.status(401).send("Unauthorized.")
        }
        req.user = user
    }
    next();
}

export default tokenExtractor