import { IsNumber } from 'class-validator';

export class SendMessageDto {
  @IsNumber()
  id: number;
}
