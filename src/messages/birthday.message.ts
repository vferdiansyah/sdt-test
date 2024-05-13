import { BaseMessage } from './base.message';

export class BirthdayMessage extends BaseMessage {
  constructor(firstName: string, lastName: string) {
    super(`${firstName} ${lastName}`);
  }

  generateMessage() {
    return `Hey, ${this.fullName} it's your birthday`;
  }
}
