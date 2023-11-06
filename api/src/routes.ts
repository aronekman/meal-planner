import { Router } from 'express';
import multer from 'multer';

import { createUser, deleteUserToken, getNewAccessToken, handleLogin } from './controllers/authentication';
import { getPlan, updatePlan } from './controllers/plans';
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
  unsaveRecipe} from './controllers/recipes';
import AuthMiddleware from './middleware/authenticationMiddleware';

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
router.put('/plans', AuthMiddleware, updatePlan);
export default router;

// Add section for own published Recipe -> My Recipe Page has 3 sections: saved / published / drafts
// 1. Create recipe -> Draft (unpublished)
// create recipe page has 3 options: Save changes (modifyRecipe), delete (deleteRecipe), publish (publishRecipe)
