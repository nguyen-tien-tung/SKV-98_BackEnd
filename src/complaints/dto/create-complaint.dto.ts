import { IsNotEmpty } from 'class-validator';
export class CreateComplaintDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  phoneNumberOrEmail: string;

  @IsNotEmpty()
  content: string;
}
