import 'dotenv/config';

import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

import loggerMiddleware from './middleware/logger.js';
import router from './routes.js';
import config from './utils/config.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use(loggerMiddleware);

app.use('/api', router);

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log(path.join(__dirname, 'dist'));

app.use('/uploads', express.static('uploads'));
app.use('/client', express.static(path.join(__dirname, 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

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
