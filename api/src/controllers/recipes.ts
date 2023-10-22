import { RequestHandler } from 'express';

import Recipe from '../models/Recipe';

export const createRecipe: RequestHandler = async (req, res) => {
  const recipe = await Recipe.create({ ...req.body, created_by: req.user?._id, image: req.file?.filename });
  res.status(201).send(recipe);
};

export const modifyRecipe: RequestHandler = async (req, res) => {
  const recipeId = req.query.id;
  if (!recipeId) {
    return res.status(400).send('Id of recipe not specified');
  }
  const recipe = await Recipe.findById(recipeId);
  if (!recipe) {
    return res.status(404);
  }
  if (recipe.created_by.toString() != req.user?._id.toString()) {
    return res.status(401).send('Unauthorized');
  }
  const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, {...req.body, image: req.file?.filename});
  res.status(201).send(updatedRecipe);
};

export const deleteRecipe: RequestHandler = async (req, res) => {
  const recipeId = req.query.id;
  if (!recipeId) {
    return res.status(400).send('Id of recipe not specified');
  }
  const recipe = await Recipe.findById(recipeId);
  if (!recipe) {
    return res.status(204);
  }
  if (recipe.created_by.toString() != req.user?._id.toString()) {
    return res.status(401).send('Unauthorized');
  }
  await Recipe.findByIdAndDelete(recipeId);
  res.status(204).end();
};

export const publishRecipe: RequestHandler = async (req, res) => {
  const recipeId = req.query.id;
  if (!recipeId) {
    return res.status(400).send('Id of recipe not specified');
  }
  const recipe = await Recipe.findById(recipeId);
  if (!recipe) {
    return res.status(404);
  }
  if (recipe.created_by.toString() != req.user?._id.toString()) {
    return res.status(401).send('Unauthorized');
  }
  recipe.published = true;
  recipe.published_at = new Date();
  await recipe.save();
  res.status(201).end();
};

export const unpublishRecipe: RequestHandler = async (req, res) => {
  const recipeId = req.query.id;
  if (!recipeId) {
    return res.status(400).send('Id of recipe not specified');
  }
  const recipe = await Recipe.findById(recipeId);
  if (!recipe) {
    return res.status(404);
  }
  if (recipe.created_by.toString() != req.user?._id.toString()) {
    return res.status(401).send('Unauthorized');
  }
  recipe.published = false;
  recipe.published_at = undefined;
  await recipe.save();
  res.status(204).end();
};

export const getRecipes: RequestHandler = async (req, res) => {
  const recipes = await Recipe.find({ created_by: req.user });
  res.send(recipes);
};
