interface IUseCaseError {
  code: string;
  message: string;
  error?: any;
  status?: any;
}

export abstract class UseCaseError implements IUseCaseError {
  public readonly code: string;
  public readonly message: string;
  public readonly error: any;
  public readonly status: any;

  constructor(err: IUseCaseError) {
    this.code = err.code;
    this.message = err.message;

    if (err.error) {
      this.error = err.error;
    }
    if (err.status) {
      this.status = err.status;
    }
  }
}
