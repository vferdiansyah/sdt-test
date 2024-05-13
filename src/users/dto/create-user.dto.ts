import { IsDateString, IsEmail, IsString, IsTimeZone } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

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
