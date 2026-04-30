import express from 'express';
import { createMessage, getMessages , getSidebarUsers } from '../controllers/message.controllers.js';
import { protectRoute } from '../middleWare/auth.protectRouter.js';
const router = express.Router();

router.post('/users', protectRoute, getSidebarUsers); // Get users for sidebar
// Create a new message
router.post('/', protectRoute, createMessage);

// Get messages for a specific conversation 
router.get('/:conversationId', protectRoute, getMessages);

export default router;  
