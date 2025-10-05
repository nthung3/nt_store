import express from 'express';
import { auth, isAdmin } from '../../middleware/auth.js';
import upload from '../../helpers/multer.js';

import {
    CreateProduct,
    CreateProductByFix,
    DeleteProduct,
    getProductById,
    ListProduct,
    ListProductRECOMMENDED,
    UpdateProduct,
} from './product.controller.js';

const router = express.Router();

// Public routes
router.get('/', ListProduct);
router.get('/recommend', ListProductRECOMMENDED);
router.get('/:productId', getProductById);

// Admin routes (authenticated + admin only)
router.post('/', upload.fields([{ name: 'imageFile', maxCount: 1 }]), auth, isAdmin, CreateProduct);
router.put('/:productId', upload.fields([{ name: 'imageFile', maxCount: 1 }]), auth, isAdmin, UpdateProduct);
router.delete('/:productId', auth, isAdmin, DeleteProduct);

// Development/testing route
router.post('/fix', CreateProductByFix);

export default router;
