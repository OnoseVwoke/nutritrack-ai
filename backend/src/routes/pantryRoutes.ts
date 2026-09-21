import { Router } from 'express';

import {
  getPantry,
  createPantryItem,
  deletePantryItem
} from '../controllers/pantryController.js';

const router = Router();

router.get('/', getPantry);
router.post('/', createPantryItem);
router.delete('/:id', deletePantryItem);

export default router;