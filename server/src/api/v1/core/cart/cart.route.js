import express from 'express';
import { auth, isAdmin } from '../../middleware/auth.js';

const router = express.Router();

router.get('/cartbyUser', auth);
router.post('/addToCart', auth);
// upload.fields([{ name: "imageFile", maxCount: 1 }]),

export default router;
