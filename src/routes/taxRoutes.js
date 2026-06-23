import { Router } from 'express';

import {
  compareAndSave,
  listComparisons,
  showComparison,
} from '../controllers/taxController.js';

import { authMiddleware } from '../middlewares/authMiddleware.js';
import { validateBody } from '../middlewares/validateMiddleware.js';
import { compareTaxSchema } from '../validations/taxValidation.js';

const taxRoutes = Router();

taxRoutes.use(authMiddleware);

taxRoutes.post('/compare', validateBody(compareTaxSchema), compareAndSave);
taxRoutes.get('/comparisons', listComparisons);
taxRoutes.get('/comparisons/:id', showComparison);

export default taxRoutes;
