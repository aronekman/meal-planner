import { Router } from 'express';
import multer from 'multer';

import { createUser, deleteUserToken, getNewAccessToken, handleLogin } from './controllers/authentication';
import { createRecipe, getRecipes } from './controllers/recipes';
import AuthMiddleware from './middleware/authenticationMiddleware';

const router = Router();

router.post('/register', createUser);
router.post('/login', handleLogin);
router.post('/refreshToken', getNewAccessToken);
router.delete('/refreshToken', deleteUserToken);

const recipeUpload = multer({ dest: 'uploads/' });
router.post('/recipes', AuthMiddleware, recipeUpload.single('image'), createRecipe);
router.get('/recipes', AuthMiddleware, getRecipes);
export default router;
