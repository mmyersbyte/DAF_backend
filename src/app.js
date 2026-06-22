import express from 'express';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js';
import chatRoutes from './routes/chatRoutes.js';

export const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  return res.json({
    message: 'DAF Backend rodando.',
  });
});

app.use('/auth', authRoutes);
app.use('/chat', chatRoutes);
