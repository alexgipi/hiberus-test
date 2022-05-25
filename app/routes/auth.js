import express from 'express';

import * as controller from '../controllers/auth.js';
import { validateLogin, validateRegister } from '../validators/auth.js';

const router = express.Router();

const path = 'auth';

router.post(`/${path}/register`, validateRegister, controller.register);
router.post(`/${path}/login`, validateLogin, controller.login);


router.get('*', (req, res) => {
    res.status(404)
    res.send({ error: 'Not found' })
})

export {router as authRoutes};