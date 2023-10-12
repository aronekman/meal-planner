import 'dotenv/config';

import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';

import loggerMiddleware from './middleware/logger';
import router from './routes';

const app = express();
app.use(cors());
app.use(express.json());

app.use(loggerMiddleware);

app.use('/api', router);

app.get('/api/ping', (req, res) => res.send('Pong'));

const start = async () => {
  const port = process.env.PORT || 8000;
  try {
    await mongoose.connect(process.env.MONGODB_URI ?? '', { dbName: process.env.DB_NAME ?? 'meal-planner' });
    app.listen(port, () => {
      console.log(`Server running at port ${port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
