import { NextFunction, Request, Response } from 'express';

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const timestamp = new Date().toISOString();
  const { method, url } = req;
  console.log(`
          ${timestamp} 
          ${method} ${url}`);
  next();
};

export default loggerMiddleware;
