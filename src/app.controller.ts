import UserController from 'user/user.controller';
import { authenticateUser } from 'core/middleware/authentication';
import ImageController from 'image/image.controller';

export const attachPublicRoutes = (app: any): void => {
  app.use('/authentication', UserController);
};

export const attachPrivateRoutes = (app: any): void => {
  app.use('/api', authenticateUser);
  app.use('/api', ImageController);
};
