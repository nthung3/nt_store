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
router.get('/', ListProduct);
router.get('/recommend', ListProductRECOMMENDED);
router.post('/createProduct', upload.fields([{ name: 'imageFile', maxCount: 1 }]), auth, isAdmin, CreateProduct);

router.post('/createProductByFix', CreateProductByFix);
// upload.fields([{ name: "imageFile", maxCount: 1 }]),
router.patch('/updateProduct?:productId', auth, isAdmin, UpdateProduct);
router.delete('/deleteProduct?:productId', auth, isAdmin, DeleteProduct);
router.get('/:productId', getProductById);
export default router;
