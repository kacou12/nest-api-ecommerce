import {
  IsEmail,
  IsPhoneNumber,
  IsString,
  MinLength,
  Validate,
} from 'class-validator';
import { User } from '../entities/user.entity';
import { IsUnique } from '@/common/decorators/validators/is-unique.decorator';

export class CreateUserDto {
  @IsString()
  readonly name: string;

  @IsEmail()
  @IsUnique(User, 'email')
  readonly email: string;

  @IsPhoneNumber('CI')
  @IsUnique(User, 'phone')
  readonly phone: string;

  @IsString()
  @MinLength(8)
  readonly password: string;
}
