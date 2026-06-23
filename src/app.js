import express from 'express';
import cors from 'cors';

import swaggerUi from 'swagger-ui-express';

import swaggerDocument from './docs/swagger.json' with { type: 'json' };

import authRoutes from './routes/authRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import taxRoutes from './routes/taxRoutes.js';

export const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  return res.json({
    message: 'DAF Backend rodando.',
  });
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/auth', authRoutes);
app.use('/chat', chatRoutes);
app.use('/tax', taxRoutes);
