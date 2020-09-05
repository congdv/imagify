/* eslint-disable max-classes-per-file */
type ErrorData = { [key: string]: any };

export class CustomError extends Error {
  constructor(
    public message: string,
    public code: string | number = 'INTERNAL_ERROR',
    public status: number = 500,
    public data: ErrorData = {},
  ) {
    super();
  }
}

export class RouteNotFoundError extends CustomError {
  constructor(originUrl: string) {
    super(`Route '${originUrl}' does not exist.`, 'ROUTE_NOT_FOUND', 404);
  }
}

export class EntityNotFoundError extends CustomError {
  constructor(entityName: string) {
    super(`${entityName} not found`, 'ENTITY_NOT_FOUND', 404);
  }
}

export class BadUserInputData extends CustomError {
  constructor(errorData: ErrorData) {
    super('There were validation errors.', 'BAD_USER_INPUT', 400, errorData);
  }
}

export class InvalidTokenError extends CustomError {
  constructor(message = 'Authentication token is invalid') {
    super(message, 'INVALID_TOKEN', 401);
  }
}

export class AuthenticationError extends CustomError {
  constructor(message = 'The username or password is not valid') {
    super(message, 'INVALID_USER', 401);
  }
}

export class FileTypeError extends CustomError {
  constructor(message = 'The file type is not allowed') {
    super(message, 'INVALID_FILE_TYPE', 400);
  }
}
