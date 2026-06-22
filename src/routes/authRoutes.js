import { Router } from 'express';

import { register, login } from '../controllers/authController.js';
import { validateBody } from '../middlewares/validateMiddleware.js';
import { registerSchema, loginSchema } from '../validations/authValidation.js';

const authRoutes = Router();

authRoutes.post('/register', validateBody(registerSchema), register);
authRoutes.post('/login', validateBody(loginSchema), login);

export default authRoutes;
