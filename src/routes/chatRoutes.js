import { Router } from 'express';

import {
  sendMessage,
  listConversations,
} from '../controllers/chatController.js';

import { authMiddleware } from '../middlewares/authMiddleware.js';
import { validateBody } from '../middlewares/validateMiddleware.js';
import { sendMessageSchema } from '../validations/chatValidation.js';

const chatRoutes = Router();

chatRoutes.use(authMiddleware);

chatRoutes.post('/message', validateBody(sendMessageSchema), sendMessage);
chatRoutes.get('/conversations', listConversations);

export default chatRoutes;
