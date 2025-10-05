import express from 'express';
import { auth, isAdmin } from '../../middleware/auth.js';
import {
    signIn,
    signup,
    getProfile,
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    searchUsers,
    updateUserRole,
    createAdmin,
} from './user.controller.js';

const router = express.Router();

// Authentication routes (public)
router.post('/login', signIn);
router.post('/signup', signup);

// User profile routes (authenticated)
router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateUser); // User can update their own profile

// Admin routes (authenticated + admin only)
router.get('/', auth, isAdmin, getAllUsers);
router.get('/search', auth, isAdmin, searchUsers);
router.post('/', auth, isAdmin, createUser);
router.post('/create-admin', auth, isAdmin, createAdmin); // Create admin account
router.get('/:userId', auth, isAdmin, getUserById);
router.put('/:userId', auth, isAdmin, updateUser);
router.delete('/:userId', auth, isAdmin, deleteUser);
router.patch('/:userId/role', auth, isAdmin, updateUserRole);

export default router;
