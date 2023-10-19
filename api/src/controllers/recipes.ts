import { RequestHandler } from 'express';

export const createRecipe: RequestHandler = async (req, res) => {
  console.log(req.user);
  res.send('test');
};
