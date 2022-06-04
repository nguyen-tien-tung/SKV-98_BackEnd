import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty } from 'class-validator';

enum Category {
  DONG_TRUNG_HA_THAO = 'DONG_TRUNG_HA_THAO',
  YEN_SAO_THUONG_HANG = 'YEN_SAO_THUONG_HANG',
  SAFFARON = 'SAFFARON',
  NHAN_SAM = 'NHAN_SAM',
  KHAC = 'KHAC',
}

enum ProductStates {
  AVAILABLE = 'AVAILABLE',
  SOLD_OUT = 'SOLD_OUT',
  COMING_SOON = 'COMING_SOON',
}

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  origin: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  mainImage: string;

  @IsNotEmpty()
  mass: number;

  @IsNotEmpty()
  images: string[];

  @IsEnum(Category)
  category: Category;

  @IsEnum(ProductStates)
  state?: ProductStates;
}
