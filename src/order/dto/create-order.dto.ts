import { IsNotEmpty, IsEnum } from 'class-validator';

enum PaymentMethods {
  CASH = 'CASH',
  BANK_TRANSFER = 'BANK_TRANSFER',
}
export class CreateOrderDto {
  @IsNotEmpty()
  fullName: string;

  @IsNotEmpty()
  phoneNumber: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  note: string;

  @IsEnum(PaymentMethods)
  paymentMethod: PaymentMethods;
}
