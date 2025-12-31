import { HttpAdapter } from '~/logic/core/adapter/HttpAdapter';
import { Helper } from '~/logic/core/helpers/Helper';
import { serviceMock } from '../../service/serviceMock';
import { service } from '../../service/service';
import { UseCase } from './useCase';

const MOCK = Helper.isTestMode();

const httpAdapter = new HttpAdapter();

const serviceVar = MOCK
  ? new serviceMock()
  : new service(httpAdapter);

const usecaseInstance =
  new UseCase(serviceVar);

export default usecaseInstance;
