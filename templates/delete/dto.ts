import { AppError } from '../../base/AppError';
import { Either } from '../../base/Either';
import { Result } from '../../base/Result';

export namespace DTO {
  export interface Request {
    accessToken: string;
    input: {
      id: string;
    };
  }

  export type ResponseBody  = unknown

  export type Response = Either<
    AppError.UnexpectedError | AppError.BadRequest | AppError.Unauthorized,
    Result<ResponseBody>
  >;}
