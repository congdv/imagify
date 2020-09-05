import { RequestHandler } from 'express';

export const requestLogger: RequestHandler = (req, _res, next) => {
  console.log('Authorization: ', req.get('Authorization'));
  console.log('Method: ', req.method);
  console.log('Path: ', req.path);
  console.log('Body: ', req.body);
  console.log('------------');
  next();
};
