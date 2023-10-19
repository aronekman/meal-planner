import { Router } from 'express';

import { createUser, deleteUserToken, getNewAccessToken, handleLogin } from './controllers/authentication';
import { createRecipe } from './controllers/recipes';
import AuthMiddleware from './middleware/authenticationMiddleware';

const router = Router();

router.post('/register', createUser);
router.post('/login', handleLogin);
router.post('/refreshToken', getNewAccessToken);
router.delete('/refreshToken', deleteUserToken);

router.post('/recipes', AuthMiddleware, createRecipe);

export default router;
