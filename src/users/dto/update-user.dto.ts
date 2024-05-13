import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsISO8601,
  isISO8601,
  IsNumber,
  IsString,
  IsTimeZone,
} from 'class-validator';

export class UpdateUserDto {
  @IsNumber()
  id: number;

  @IsEmail()
  email?: string;

  @IsString()
  firstName?: string;

  @IsString()
  lastName?: string;

  @IsISO8601({ strict: true, strictSeparator: true })
  @Transform(({ value }) => {
    const isValidDate = isISO8601(value, {
      strict: true,
      strictSeparator: true,
    });
    if (!isValidDate) {
      throw new Error(
        `Property "dateOfBirth" should be a valid ISO8601 date string`,
      );
    }
    return new Date(value);
  })
  dateOfBirth?: Date;

  @IsString()
  location?: string;

  @IsTimeZone()
  timezone?: string;
}
