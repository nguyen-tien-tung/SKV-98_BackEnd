import { IsNotEmpty } from 'class-validator';
export class CreateLoyaltySettingDto {
  @IsNotEmpty()
  title: string;
}
