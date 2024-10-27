import express from 'express';

import { createUser } from '../controllers/user';

const router = express.Router();

router.post('/user', createUser); // example route


export default router;