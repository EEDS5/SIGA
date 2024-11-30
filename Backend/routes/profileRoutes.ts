//routes/profileRoutes.ts
import express from 'express';
import { verificarToken } from '../middlewares/authMiddleware';
import { getProfile } from '../controllers/profileController';

const router = express.Router();

router.get('/profile', verificarToken, getProfile);

export default router;