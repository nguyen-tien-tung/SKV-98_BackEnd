import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { UsersService } from 'src/user/users.service';
import { PrismaService } from '../prisma.service';
import { ProductService } from '../product/product.service';
import { LoyaltySettingService } from '../loyalty-setting/loyalty-setting.service';

@Module({
  controllers: [OrderController],
  providers: [
    OrderService,
    UsersService,
    PrismaService,
    ProductService,
    LoyaltySettingService,
  ],
})
export class OrderModule {}
