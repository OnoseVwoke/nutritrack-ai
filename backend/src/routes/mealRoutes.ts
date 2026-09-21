import { Router } from 'express';

import {
  getMeals,
  createMeal,
  deleteMeal
} from '../controllers/mealController.js';

const router = Router();

router.get('/', getMeals);
router.post('/', createMeal);
router.delete('/:id', deleteMeal);

export default router;