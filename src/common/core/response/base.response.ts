export class BaseResponse {
  constructor(
    readonly statusCode: number,
    readonly message: string,
  ) {}
}
