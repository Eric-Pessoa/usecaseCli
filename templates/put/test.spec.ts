vi.mock('~/logic/core/helpers/Helper', async () => {
  const actualModule = await vi.importActual('~/logic/core/helpers/Helper');
  class MockHelper extends (actualModule.Helper as any) {
    static isTestMode() {
      return true;
    }
  }
  return {
    ...actualModule,
    Helper: MockHelper
  };
});
//Base
import { expect, test, beforeAll, describe, vi } from 'vitest';
import { UseCase } from '../../base/UseCase';
import { UseCaseError } from '../../base/UseCaseError';
import { ErrorCodeEnum } from '../../base/ErrorCodeEnum';
//Imports
import { ServiceMock } from '../../services/serviceMock';
import { Usecase } from './useCase';
import { DTO } from './dto';

describe('Service/Usecase', () => {
  let useCase: UseCase<
    DTO.Request,
    DTO.Response
  >;
  let service: ServiceMock;

  beforeAll(async () => {
    service = new ServiceMock();
    useCase = new Usecase(service);
  });

  const input: DTO.Request = {
    input: {
      id: '123456'
    },
    accessToken: 'Bearer token'
  };

  async function expectErrorResponse(
    errorMessage: string,
    expectedErrorCode: ErrorCodeEnum
  ) {
    const spy = vi.spyOn(service, 'put');

    spy.mockImplementationOnce((): any => {
      return Promise.reject(new Error(errorMessage));
    });

    const res = await useCase.execute(input);

    expect(res.isRight()).toBe(false);

    const errorValue = (
      res as DTO.Response
    ).value.errorValue() as UseCaseError;

    expect(errorValue.code).toBe(expectedErrorCode);
  }

  test('should return success response', async () => {
    const res = await useCase.execute(input);

    expect(res.isRight()).toBe(true);

    const successValue = res.value.getValue();

    expect(successValue).toBeDefined();
  });

  describe('Auxiliar methods', () => {
    //If necessary
  });

  describe('Error Responses', () => {
    test('should return Bad Request', async () =>
      expectErrorResponse('Bad Request', ErrorCodeEnum.BadRequest));
    test('should return Access Denied Error', async () =>
      expectErrorResponse('401 Access Denied', ErrorCodeEnum.AccessDenied));
    test('should return Not Found Error', async () =>
      expectErrorResponse('404 Not Found', ErrorCodeEnum.NotFound));
    test('should return Unexpected Error', async () =>
      expectErrorResponse('UnexpectedError', ErrorCodeEnum.UnexpectedError));
  });
});
