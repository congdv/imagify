import { Request } from 'express';

import { verifyToken } from 'core/utils/authToken';
import { catchErrors, InvalidTokenError } from 'core/errors';
import { User } from 'user/schema';

export const authenticateUser = catchErrors(async (req, _res, next) => {
  const token = getAuthTokenFromRequest(req);

  if (!token) {
    throw new InvalidTokenError('Authentication token not found');
  }
  const userId = verifyToken(token).sub;

  if (!userId) {
    throw new InvalidTokenError('Authentication token is valid');
  }

  const user = await User.findOne(userId);

  if (!user) {
    throw new InvalidTokenError('Authentication token is invalid: User not found');
  }
  req.currentUser = user;
  next();
});

export const getAuthTokenFromRequest = (req: Request): string | null => {
  const header = req.get('Authorization') || '';
  const [bearer, token] = header.split(' ');
  return bearer === 'Bearer' && token ? token : null;
};
