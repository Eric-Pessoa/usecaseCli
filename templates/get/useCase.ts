import type { UseCase } from '../../base/UseCase';
import { right } from '../../base/Either';
import { Result } from '../../base/Result';
import { DTO } from './dto';
import { ServiceDTO } from '../../service/serviceDTO';
import { IService } from '../../service/service';

export class Usecase
  implements
    UseCase<
      DTO.Request,
      DTO.Response
    >
{
  constructor(private service: IService) {
    this.service = service;
  }

  public async execute(
    req: DTO.Request
  ): Promise<DTO.Response> {
    try {
      const res =
        await this.service.get(
          this.buildRequestData(req)
        );

      return right(Result.ok(this.buildResponseData(res)));
    } catch (err) {
      return Helper.handleErrors(
        err
      ) as DTO.Response;
    }
  }

  private buildRequestData(
    req: DTO.Request
  ): ServiceDTO.Get.Input {
    const { accessToken, input } = req;

    return {
      accessToken,
      input: {
        id: input.id
      }
    };
  }

  private buildResponseData(
    value: ServiceDTO.Get.Output
  ): DTO.ResponseBody {
    return value
  }
}
