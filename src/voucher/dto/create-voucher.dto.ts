import { IsNotEmpty, IsNumber } from 'class-validator';
enum VoucherTypes {
  FIXED_VALUE = 'FIXED_VALUE',
  PERCENTAGE = 'PERCENTAGE',
}

export class CreateVoucherDto {
  @IsNotEmpty()
  type: VoucherTypes;

  @IsNumber()
  maxValue?: number;
}
