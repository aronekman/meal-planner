import { Router } from 'express';
import multer from 'multer';

import { createUser, deleteUserToken, getNewAccessToken, handleLogin } from './controllers/authentication.js';
import { getIngredient } from './controllers/ingredient.js';
import { addMeal, deleteMeal, getPlan } from './controllers/plans.js';
import {
  createRecipe,
  deleteRecipe,
  getDraftedRecipes,
  getPublishedRecipes,
  getRecipes,
  getSavedRecipes,
  modifyRecipe,
  publishRecipe,
  saveRecipe,
  unpublishRecipe,
  unsaveRecipe
} from './controllers/recipes.js';
import AuthMiddleware from './middleware/authenticationMiddleware.js';

const router = Router();

router.post('/register', createUser);
router.post('/login', handleLogin);
router.post('/refreshToken', getNewAccessToken);
router.delete('/refreshToken', deleteUserToken);

const recipeUpload = multer({ dest: 'uploads/' });
router.post('/recipes', AuthMiddleware, recipeUpload.single('image'), createRecipe);
router.put('/recipes', AuthMiddleware, recipeUpload.single('image'), modifyRecipe);
router.delete('/recipes', AuthMiddleware, deleteRecipe);
router.post('/recipes/publish', AuthMiddleware, publishRecipe);
router.post('/recipes/unpublish', AuthMiddleware, unpublishRecipe);
router.post('/recipes/save', AuthMiddleware, saveRecipe);
router.post('/recipes/unsave', AuthMiddleware, unsaveRecipe);
router.get('/recipes', AuthMiddleware, getRecipes);
router.get('/recipes/saved', AuthMiddleware, getSavedRecipes);
router.get('/recipes/drafts', AuthMiddleware, getDraftedRecipes);
router.get('/recipes/published', AuthMiddleware, getPublishedRecipes);

router.get('/plans', AuthMiddleware, getPlan);
router.post('/meals', AuthMiddleware, addMeal);
router.delete('/meals', AuthMiddleware, deleteMeal);

router.get('/ingredient', AuthMiddleware, getIngredient);
export default router;
