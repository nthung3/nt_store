import express from 'express';

import productRoute from './core/product/product.router.js';
import userRoute from './core/user/user.router.js';
import categoryRoute from './core/category/category.route.js';
import cartRoute from './core/cart/cart.route.js';

const router = express.Router();

// API v1 Routes
router.use('/products', productRoute);
router.use('/users', userRoute);
router.use('/auth', userRoute); // Auth endpoints
router.use('/categories', categoryRoute);
router.use('/cart', cartRoute);

export default router;
