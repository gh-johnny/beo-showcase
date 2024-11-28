import { AxiosError } from 'axios';
import { CustomError, NotFoundError, BadRequestError, UnauthorizedError, ForbiddenError, InternalServerError } from '@/errors/CustomError';

class ErrorHandler {
  constructor() { }

  public async handle<T>(promise: Promise<T>): Promise<T> {
    try {
      return await promise;
    } catch (error) {
      this.processError(error);
    }
  }

  public processError(error: unknown): never {
    if (error instanceof AxiosError) {
      const { response } = error;

      if (response) {
        const { status, data } = response;
        switch (status) {
          case 400:
            throw new BadRequestError(data?.message || 'Bad request');
          case 401:
            throw new UnauthorizedError(data?.message || 'Unauthorized access');
          case 403:
            throw new ForbiddenError(data?.message || 'Forbidden access');
          case 404:
            throw new NotFoundError(data?.message || 'Resource not found');
          case 500:
            throw new InternalServerError(data?.message || 'Internal server error');
          default:
            throw new CustomError(data?.message || 'Unexpected error occurred', status);
        }
      }

      throw new CustomError('Network error occurred');
    }

    throw new CustomError('An unexpected/unknown error occurred');
  }
}

export default ErrorHandler;
