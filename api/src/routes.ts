import { Router } from 'express';

import { createUser } from './controllers/authentication';

const router = Router();

router.post('/register', createUser);

export default router;
