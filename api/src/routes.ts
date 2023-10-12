import { Router } from 'express';

import { createUser, deleteUserToken, getNewAccessToken, handleLogin } from './controllers/authentication';

const router = Router();

router.post('/register', createUser);
router.post('/login', handleLogin);
router.post('/refreshToken', getNewAccessToken);
router.delete('/refreshToken', deleteUserToken);

export default router;
