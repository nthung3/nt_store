import express from 'express';
import { auth, isAdmin } from '../../middleware/auth.js';
import { getAllProfile, getProfile, signIn, signup } from './user.controller.js';
const router = express.Router();
router.get('/profile', (req, res) => {
    res.send('hello from simple server');
});

router.get('/getAll', auth, isAdmin, getAllProfile);
router.post('/login', signIn);
router.get('/getprofile', auth, getProfile);
router.post('/signup', signup);
router.post('/loginAdmin', (req, res) => {
    res.send('hello from simple server :)');
});
export default router;
