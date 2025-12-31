import { AppError } from '../base/AppError';
import { Either } from '../base/Either';
import { Result } from '../base/Result';

/**
 * Generic type for defining possible errors of usecase.
 *
 * @type {T} Success - Success interface, in case of usecase returning 200.
 * @type {E} Errors - Types of errors, assumes default if not provided.
 * @returns Either success or one of the errors.
 */
export type GenericUsecaseError<
  T,
  E =
    | AppError.UnexpectedError
    | AppError.DataNotFound
    | AppError.Unauthorized
    | AppError.BadRequest
> = Either<E, Result<T>>;
