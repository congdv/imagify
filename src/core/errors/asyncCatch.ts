import { RequestHandler } from 'express';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { groupBy } from 'lodash';

import { DTO } from 'core/utils/dto';
import { PageOptionsDto } from 'core/dto/page-options.dto';
import { User } from 'shared/dto/User.dto';
import { BadUserInputData } from './customErrors';

export const catchErrors = (requestHandler: RequestHandler): RequestHandler => {
  // eslint-disable-next-line consistent-return
  return async (req, res, next): Promise<any> => {
    try {
      return await requestHandler(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export const parseData = (requestHandler: any, T: any): RequestHandler => {
  return async (req: any, res: any, next): Promise<any> => {
    try {
      console.log(req.query);
      const pagination = plainToClass(PageOptionsDto, { ...req.query });
      console.log('pagination', pagination);
      const groupFiles = groupBy(req.files, 'fieldname');
      const data = plainToClass(T, { ...req.body, ...groupFiles });
      const currentUser = DTO.toDto(User, req.currentUser);
      const validationErrors: ValidationError[] = await validate(data);
      let errors: string[] = [];
      for (const validationError of validationErrors) {
        if (validationError.constraints) {
          for (const [, constraint] of Object.entries(validationError.constraints)) {
            errors = [...errors, constraint];
          }
        }
      }
      if (errors.length > 0) throw new BadUserInputData(errors);
      console.log('req.currentUser', currentUser);
      const response = await requestHandler(data, currentUser, pagination);
      res.respond(response);
    } catch (error) {
      console.log('error', error);
      if (error.detail) {
        next(new BadUserInputData(error.detail));
      } else {
        next(error);
      }
    }
  };
};
