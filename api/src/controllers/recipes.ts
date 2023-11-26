import { RequestHandler } from 'express';

import Recipe from '../models/Recipe.js';
import User from '../models/User.js';

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
    return res.status(404).json({ error: 'Recipe Id not found' });
  }
  if (recipe.created_by.toString() != req.user?._id.toString()) {
    return res.status(401).send('Unauthorized');
  }
  const updatedRecipe = await Recipe.findByIdAndUpdate(
    recipeId,
    { ...req.body, image: req.file?.filename },
    { new: true }
  );
  res.status(201).send(updatedRecipe);
};

export const deleteRecipe: RequestHandler = async (req, res) => {
  const recipeId = req.query.id;
  if (!recipeId) {
    return res.status(400).send('Id of recipe not specified');
  }
  const recipe = await Recipe.findById(recipeId);
  if (!recipe) {
    return res.status(204).end();
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
    return res.status(404).json({ error: 'Recipe Id not found' });
  }
  if (recipe.created_by.toString() != req.user?._id.toString()) {
    return res.status(401).send('Unauthorized');
  }
  recipe.published = true;
  recipe.published_at = new Date();
  await recipe.save();
  res.status(200).send(recipe);
};

export const unpublishRecipe: RequestHandler = async (req, res) => {
  const recipeId = req.query.id;
  if (!recipeId) {
    return res.status(400).send('Id of recipe not specified');
  }
  const recipe = await Recipe.findById(recipeId);
  if (!recipe) {
    return res.status(404).json({ error: 'Recipe Id not found' });
  }
  if (recipe.created_by.toString() != req.user?._id.toString()) {
    return res.status(401).send('Unauthorized');
  }
  recipe.published = false;
  recipe.published_at = undefined;
  await recipe.save();
  res.status(200).send(recipe);
};

export const saveRecipe: RequestHandler = async (req, res) => {
  const recipeId = req.query.id;
  if (!recipeId) {
    return res.status(400).send('Id of recipe not specified');
  }
  const recipe = await Recipe.findById(recipeId);
  if (!recipe) {
    return res.status(404).json({ error: 'Recipe Id not found' });
  }
  const user = req.user;
  if (!user) {
    return res.status(401).send('Unauthorized');
  }
  const updatedUser = await User.findByIdAndUpdate(user._id, { $push: { savedRecipes: recipe._id } }, { new: true });
  if (!updatedUser) return res.sendStatus(404);
  return res.status(200).send(recipe);
};

export const unsaveRecipe: RequestHandler = async (req, res) => {
  const recipeId = req.query.id;
  if (!recipeId) {
    return res.status(400).send('Id of recipe not specified');
  }
  const recipe = await Recipe.findById(recipeId);
  if (!recipe) {
    return res.status(404).json({ error: 'Recipe Id not found' });
  }
  const user = req.user;
  if (!user) {
    return res.status(401).send('Unauthorized');
  }
  const updatedUser = await User.findByIdAndUpdate(user._id, { $pull: { savedRecipes: recipe._id } }, { new: true });
  if (!updatedUser) return res.sendStatus(404);
  return res.status(200).send(recipe);
};

export const getRecipes: RequestHandler = async (req, res) => {
  const searchPhrase = req.query.search;
  const timeLimit = req.query.timeLimit;
  const difficulty = req.query.difficulty;
  const costLimit = req.query.costLimit;

  let recipes = await Recipe
    .find({ published: true, created_by: { $nin: req.user?._id } })
    .sort('-published_at')
    .populate('created_by', 'username');
  recipes = recipes.filter(recipe => {
    let valid = true;
    if (searchPhrase) {
      valid = valid && recipe.name.toLowerCase().includes(searchPhrase.toString().toLowerCase());
    }
    if (timeLimit) {
      const numTime = parseFloat(timeLimit.toString());
      if (!isNaN(numTime)) {
        valid = recipe.time ? valid && recipe.time <= numTime : false;
      }
    }
    if (difficulty) {
      valid = recipe.difficulty ? difficulty.toString().includes(recipe.difficulty) : false;
    }
    if (costLimit) {
      const numCost = parseFloat(costLimit.toString());
      if (!isNaN(numCost)) {
        valid = recipe.cost ? valid && recipe.cost <= numCost : false;
      }
    }
    return valid;
  });
  res.send(recipes);
};

export const getSavedRecipes: RequestHandler = async (req, res) => {
  const recipeIds = req.user?.saved_recipes;
  const recipes = await Recipe
    .find({ published: true, _id: { $in: recipeIds } })
    .populate('created_by', 'username');
  res.send(recipes);
};

export const getDraftedRecipes: RequestHandler = async (req, res) => {
  const recipes = await Recipe
    .find({ published: false, created_by: req.user?._id })
    .populate('created_by', 'username');
  res.send(recipes);
};

export const getPublishedRecipes: RequestHandler = async (req, res) => {
  const recipes = await Recipe
    .find({ published: true, created_by: req.user?._id })
    .populate('created_by', 'username');
  res.send(recipes);
};
