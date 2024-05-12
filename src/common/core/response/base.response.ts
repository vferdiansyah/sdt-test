export class BaseResponse {
  constructor(
    private readonly statusCode: number,
    private readonly message: string,
  ) {}
}
