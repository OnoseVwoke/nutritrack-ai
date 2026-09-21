import { Router } from 'express';

import {
  getWeights,
  createWeight,
  deleteWeight
} from '../controllers/weightController.js';

const router = Router();

router.get('/', getWeights);
router.post('/', createWeight);
router.delete('/:id', deleteWeight);

export default router;