import { AxiosError } from 'axios';

export class CustomError extends Error {
  statusCode?: number;
  axiosError?: AxiosError;

  constructor(message: string, statusCode?: number, axiosError?: AxiosError) {
    super(message);
    this.statusCode = statusCode;
    this.axiosError = axiosError;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestError extends CustomError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class UnauthorizedError extends CustomError {
  constructor(message: string) {
    super(message, 401);
  }
}

export class ForbiddenError extends CustomError {
  constructor(message: string) {
    super(message, 403);
  }
}

export class NotFoundError extends CustomError {
  constructor(message: string) {
    super(message, 404);
  }
}

export class InternalServerError extends CustomError {
  constructor(message: string) {
    super(message, 500);
  }
}
