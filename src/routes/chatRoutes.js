import { Router } from 'express';

import {
  sendMessage,
  listConversations,
} from '../controllers/chatController.js';

import { authMiddleware } from '../middlewares/authMiddleware.js';

const chatRoutes = Router();

chatRoutes.use(authMiddleware);

chatRoutes.post('/message', sendMessage);
chatRoutes.get('/conversations', listConversations);

export default chatRoutes;
