import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Request,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Category } from '@prisma/client';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  @Get()
  findAll() {
    return this.productService.products({});
  }

  @Get('best')
  findBestSeller() {
    return this.productService.products({ take: 4, orderBy: { sold: 'desc' } });
  }
  @Get('byCategory/:category')
  findByCategory(@Param('category') category: Category) {
    return this.productService.products({ where: { category } });
  }

  @Get('search-by-name')
  findByName(@Query('name') name: string) {
    return this.productService.products({
      where: { name: { startsWith: name, mode: 'insensitive' } },
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.product({ id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.updateProduct({
      where: { id },
      data: updateProductDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.deleteProduct({ id });
  }
}
