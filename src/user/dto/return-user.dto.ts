import { IsEmail } from 'class-validator/types/decorator/decorators';
import { IsNotEmpty } from 'class-validator';

export class ReturnUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  username: string;
}
