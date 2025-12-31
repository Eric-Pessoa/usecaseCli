import {GenericUsecaseError} from '../../base/ErrorType'

export namespace DTO {
  export interface Request {
    accessToken: string;
    input: {
      id: string;
    };
  }

  export interface ResponseBody {
    property1: string;
  }

  export type Response = GenericUsecaseError<ResponseBody>;
}
