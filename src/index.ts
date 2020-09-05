import 'module-alias/register';
import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import initializeDatabaseConnection from 'app.module';
import { addRespondToResponse } from 'core/middleware/response';
import { requestLogger } from 'core/middleware/logger';
import { handleError } from 'core/middleware/errors';
import { RouteNotFoundError } from 'core/errors';

import { attachPublicRoutes, attachPrivateRoutes } from './app.controller';

// app

const establishDatabaseConnection = async (): Promise<void> => {
  try {
    await initializeDatabaseConnection();
    console.log(`Connected to DB: ${process.env.DB_DATABASE} `);
  } catch (error) {
    console.log(error);
  }
};

const initializeExpress = (): void => {
  const app = express();

  app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

  app.use(cors());
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true }));

  app.use(requestLogger);
  app.use(addRespondToResponse);

  attachPublicRoutes(app);
  attachPrivateRoutes(app);

  app.use((req, _res, next) => next(new RouteNotFoundError(req.originalUrl)));
  app.use(handleError);
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

const initializeApp = async (): Promise<void> => {
  await establishDatabaseConnection();
  initializeExpress();
};

initializeApp();
