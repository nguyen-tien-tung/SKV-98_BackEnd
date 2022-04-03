import { Module } from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';
import { PrismaService } from '../prisma.service';

@Module({
  imports: [PrismaService],
  providers: [ShoppingCartService],
})
export class ShoppingCartModule {}
