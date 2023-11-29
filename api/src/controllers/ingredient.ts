import { RequestHandler } from 'express';

import config from '../utils/config.js';

export const getIngredient: RequestHandler = async (req, res) => {
  const search = req.query.search;
  const amount = req.query.amount;
  console.log(search, amount);
  const response = await fetch(`https://api.api-ninjas.com/v1/nutrition?query=${amount} ${search}`, {
    headers: { 'X-Api-Key': config.apiNinjasKey }
  });
  const data = await response.json();
  console.log(data);
  if (!data.length) return res.sendStatus(500);
  res.send(data[0]);
};
