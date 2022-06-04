import { IsNotEmpty, IsNumber } from 'class-validator';
export class CreateLoyaltySettingDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  hasPrivateCard: boolean;

  @IsNotEmpty()
  hasBirthdayGift: boolean;

  @IsNotEmpty()
  hasEventTicket: boolean;

  @IsNotEmpty()
  isVip: boolean;

  @IsNotEmpty()
  @IsNumber()
  pointGainPerItem: number;

  @IsNotEmpty()
  @IsNumber()
  pointRequirement: number;
}
