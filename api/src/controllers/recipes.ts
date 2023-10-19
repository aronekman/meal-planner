import { RequestHandler } from 'express';

import Recipe from '../models/recipe';

export const createRecipe: RequestHandler = async (req, res) => {
  const recipe = await Recipe.create({ ...req.body, created_by: req.user?._id, image: req.file?.filename });
  res.status(201).send(recipe);
};

export const getRecipes: RequestHandler = async (req, res) => {
  const recipes = await Recipe.find({ created_by: req.user });
  res.send(recipes);
};
