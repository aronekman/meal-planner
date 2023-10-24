import { RequestHandler } from 'express';

import Recipe from '../models/Recipe';
import User from '../models/User';

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

export const saveRecipe : RequestHandler = async (req, res) => {
  const recipeId = req.query.id;
  if (!recipeId) {
    return res.status(400).send('Id of recipe not specified');
  }
  const recipe = await Recipe.findById(recipeId);
  if (!recipe) {
    return res.status(404);
  }
  const userId = req.user?._id;
  const savedRecipes = req.user?.savedRecipes;
  if (!userId) {
    return res.status(401).send('Unauthorized');
  }
  if (savedRecipes) {
    await User.findByIdAndUpdate(userId, {savedRecipes : savedRecipes.concat(recipe._id.toString())});
    return res.status(200).send({savedRecipes : savedRecipes.concat(recipe._id.toString())});
  }
  res.status(404).end();
};

export const unsaveRecipe : RequestHandler = async (req, res) => {
  const recipeId = req.query.id;
  if (!recipeId) {
    return res.status(400).send('Id of recipe not specified');
  }
  const recipe = await Recipe.findById(recipeId);
  if (!recipe) {
    return res.status(404);
  }
  const userId = req.user?._id;
  const savedRecipes = req.user?.savedRecipes;
  if (!userId) {
    return res.status(401).send('Unauthorized');
  }
  if (savedRecipes) {
    await User.findByIdAndUpdate(userId, {savedRecipes : savedRecipes.filter(id => id != recipe._id.toString())});
    return res.status(200).send({savedRecipes : savedRecipes.filter(id => id != recipe._id.toString())});
  }
  res.status(404).end();
};

export const getPublishedRecipes : RequestHandler = async (req, res) => {
  const recipes = await Recipe.find({ published : true });
  res.send(recipes);
};

export const getSavedRecipes : RequestHandler = async (req, res) => {
  const recipeIds = req.user?.savedRecipes;
  const recipes = (await Recipe.find({ published : true }))
    .filter(recipe => recipe.created_by.toString() == req.user?._id.toString() || recipeIds?.includes(recipe._id.toString()));
  res.send(recipes);
};

export const getDraftedRecipes : RequestHandler = async (req, res) => {
  const recipes = await Recipe.find({ published : false, created_by : req.user?._id });
  res.send(recipes);
};

export const getRecipes: RequestHandler = async (req, res) => {
  const recipes = await Recipe.find({ created_by: req.user?._id });
  res.send(recipes);
};
