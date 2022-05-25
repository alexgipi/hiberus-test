import express from 'express';

import * as controller from '../controllers/user.js';
import { cacheInit } from '../middleware/cache.js';
import { authMiddleware } from '../middleware/session.js';
import { validateSaveUser, validateUpdateUser } from '../validators/user.js';

const router = express.Router();

const path = 'users';

router.post(`/${path}`,authMiddleware, controller.saveUser);
router.get(`/${path}/:id`, [authMiddleware, cacheInit], controller.getUser);
router.get(`/${path}/:limit?/:page?`, [authMiddleware, cacheInit], controller.getUsers);

router.put(`/${path}/:id`, authMiddleware, validateUpdateUser, controller.updateUser);
router.delete(`/${path}/:id`, authMiddleware, controller.deleteUser);

export {router as userRoutes};