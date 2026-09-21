import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import mealRoutes from './routes/mealRoutes.js';
import pantryRoutes from './routes/pantryRoutes.js';
import weightRoutes from './routes/weightRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';

import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();

app.use(
  cors({
    origin:
      process.env.FRONTEND_URL ||
      'http://localhost:5173'
  })
);

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'healthy',
    service: 'nutritrack-api'
  });
});

app.use(
  '/api/meals',
  mealRoutes
);

app.use(
  '/api/pantry',
  pantryRoutes
);

app.use(
  '/api/weights',
  weightRoutes
);

app.use(
  '/api/dashboard',
  dashboardRoutes
);

app.use(errorHandler);

export default app;