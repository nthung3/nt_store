import { auth, isAdmin } from '../../middleware/auth.js';
import express from 'express';
import { createCategory, ListCategory } from './category.controller.js';
const router = express.Router();
router.get('/', ListCategory);

router.post('/create', createCategory);
export default router;
