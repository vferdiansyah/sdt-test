import { IsDateString, IsString, IsTimeZone } from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsDateString()
  dateOfBirth: string;

  @IsString()
  location: string;

  @IsTimeZone()
  timezone: string;
}
