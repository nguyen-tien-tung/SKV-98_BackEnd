import { Transform } from 'class-transformer';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @Transform((value) => Number(value))
  price: number;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  mainImage: string;

  @IsNotEmpty()
  images: string[];
}
