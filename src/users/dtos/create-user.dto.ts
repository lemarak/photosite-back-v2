import { Type } from 'class-transformer';
import { IsEmail, IsObject, IsString, ValidateNested } from 'class-validator';

class Account {
  @IsString()
  username: string;
}

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @Type(() => Account)
  @ValidateNested()
  account: Account;
}
