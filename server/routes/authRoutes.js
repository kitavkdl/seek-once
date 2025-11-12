import express from 'express';
import { signUp } from '../controllers/authController.js';

const router = express.Router();

// POST /api/auth/signup
router.post('/signup', signUp);

export default router;
