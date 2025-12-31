/* eslint-disable no-console */
import { ErrorCodeEnum } from './ErrorCodeEnum';
import { Result } from './Result';
import { UseCaseError } from './UseCaseError';

export namespace AppError {
  export class UnexpectedError extends Result<UseCaseError> {
    public constructor(err: any) {
      super(false, {
        code: ErrorCodeEnum.UnexpectedError,
        message: 'generic_error',
        error: err
      } as UseCaseError);
      console.log(`[AppError]: An unexpected error occurred`);
      console.log(err);
    }

    public static create(err: any): UnexpectedError {
      return new UnexpectedError(err);
    }
  }

  export class Unauthorized extends Result<UseCaseError> {
    public constructor(err: any) {
      super(false, {
        code: ErrorCodeEnum.AccessDenied,
        message: 'generic_error',
        error: err
      } as UseCaseError);
      console.log(`[AppError]: An unexpected error occurred`);
      console.log(err);
    }

    public static create(err: any): UnexpectedError {
      return new UnexpectedError(err);
    }
  }
  export class Forbidden extends Result<UseCaseError> {
    public constructor(err: any) {
      super(false, {
        code: ErrorCodeEnum.AccessDenied,
        message: 'generic_error',
        error: err
      } as UseCaseError);
      console.log(`[AppError]: An unexpected error occurred`);
      console.log(err);
    }

    public static create(err: any): UnexpectedError {
      return new UnexpectedError(err);
    }
  }

  export class RequiredFields extends Result<UseCaseError> {
    public constructor() {
      super(false, {
        code: ErrorCodeEnum.RequiredFields,
        message: 'Required Fields'
      } as UseCaseError);
    }

    public static create(err: any): UnexpectedError {
      return new UnexpectedError(err);
    }
  }
  export class TimeoutError extends Result<UseCaseError> {
    public constructor(err: any) {
      super(false, {
        code: ErrorCodeEnum.Timeout,
        message: 'timeout',
        error: err
      } as UseCaseError);
      console.log(`[AppError]: A timeout error occurred`);
      console.error(err);
    }

    public static create(err: any): TimeoutError {
      return new TimeoutError(err);
    }
  }

  export class AccessDeniedError extends Result<UseCaseError> {
    public constructor(err?: any) {
      super(false, {
        code: ErrorCodeEnum.AccessDenied,
        message: 'Access Denied',
        error: err
      } as UseCaseError);
    }

    public static create(err: any): AccessDeniedError {
      return new AccessDeniedError(err);
    }
  }

  export class DataNotFound extends Result<UseCaseError> {
    public constructor(err?: any) {
      super(false, {
        code: ErrorCodeEnum.NotFound,
        message: 'Data Not Found',
        error: err,
        status: 404
      } as UseCaseError);
    }

    public static create(err: any): DataNotFound {
      return new DataNotFound(err);
    }
  }
  export class BadRequest extends Result<UseCaseError> {
    public constructor(err?: any) {
      super(false, {
        code: ErrorCodeEnum.BadRequest,
        message: 'Bad Request',
        error: err
      } as UseCaseError);
    }

    public static create(err: any): BadRequest {
      return new BadRequest(err);
    }
  }
}
