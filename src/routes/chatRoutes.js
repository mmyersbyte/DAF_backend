import { Router } from 'express';

import {
  sendMessage,
  listConversations,
} from '../controllers/chatController.js';

const chatRoutes = Router();

chatRoutes.post('/message', sendMessage);
chatRoutes.get('/conversations/:userId', listConversations);

export default chatRoutes;
