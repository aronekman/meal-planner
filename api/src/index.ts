import 'dotenv/config';

import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';

import AuthMiddleware, { IUserRequest } from './middleware/authenticationMiddleware';
import loggerMiddleware from './middleware/logger';
import router from './routes';
import config from './utils/config';

const app = express();
app.use(cors());
app.use(express.json());

app.use(loggerMiddleware);

app.use('/api', router);

app.get('/api/ping', AuthMiddleware, (req: IUserRequest, res) => res.send(`Hello ${req.user?.userName}`));

const start = async () => {
  try {
    await mongoose.connect(config.mongoDbUrl, { dbName: config.dbName });
    app.listen(config.port, () => {
      console.log(`Server running at port ${config.port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
