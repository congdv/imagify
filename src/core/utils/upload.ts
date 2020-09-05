import { FileTypeError } from 'core/errors/customErrors';

const imageFilter = (_req: any, file: any, next: any): void => {
  // accept image only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return next(new FileTypeError('Only jpg, jpeg, png and gif are allowed!'), false);
  }
  next(null, true);
};

export { imageFilter };
