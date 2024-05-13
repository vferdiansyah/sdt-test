export abstract class BaseMessage {
  protected constructor(protected readonly fullName: string) {}

  protected abstract generateMessage(): string;
}
