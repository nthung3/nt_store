import express from 'express';

import productRoute from './core/product/product.router.js';
import userRoute from './core/user/user.router.js';
import categoryRoute from './core/category/category.route.js';
import CartRoute from './core/cart/cart.route.js';
const router = express.Router();
router.use('/product', productRoute);
router.use('/user', userRoute);
router.use('/category', categoryRoute);
router.use('/cart', CartRoute);
export default router;
