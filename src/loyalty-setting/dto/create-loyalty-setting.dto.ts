import { Transform } from 'class-transformer';
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
  @Transform(({ value }) => +value)
  pointGainPerItem: number;

  @IsNotEmpty()
  @Transform(({ value }) => +value)
  pointRequirement: number;
}
