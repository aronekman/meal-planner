import { NextFunction, Request, Response } from "express";

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const timestamp = new Date().toISOString();
  const { method, url, ip } = req;
  console.log(`
          ${timestamp} 
          ${method} ${url}`);
  next();
  next();
};

export default loggerMiddleware;
