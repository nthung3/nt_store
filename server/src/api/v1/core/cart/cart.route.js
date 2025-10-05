import express from 'express';
import { auth, isAdmin } from '../../middleware/auth.js';
import {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    getAllCarts,
    deleteCart,
} from './cart.controller.js';

const router = express.Router();

// User cart routes (authenticated users only)
router.get('/', auth, getCart);
router.post('/add', auth, addToCart);
router.put('/update', auth, updateCartItem);
router.delete('/remove/:productId', auth, removeFromCart);
router.delete('/clear', auth, clearCart);

// Admin routes
router.get('/admin/all', auth, isAdmin, getAllCarts);
router.delete('/admin/:userId', auth, isAdmin, deleteCart);

export default router;
