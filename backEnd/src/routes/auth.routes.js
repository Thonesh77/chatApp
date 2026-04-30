import express from 'express';
import {  protectRoute } from '../middleWare/auth.protectRouter.js'; // Import the middleware
import { signup, login, logout, updateProfile , checkAuth} from '../controllers/auth.controllers.js';
const router = express.Router();

router.post('/signup', signup);  // Use the controller, not inline function
router.post('/login', login);    // Use the controller
router.post('/logout', logout);  // Use the controller

router.put('/update-profile',protectRoute, updateProfile); // Add route for updating profile

router.get('/check-auth', protectRoute, checkAuth); // Add route for checking authentication status
export default router;