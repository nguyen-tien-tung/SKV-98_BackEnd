import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { UsersService } from 'src/user/users.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [OrderController],
  providers: [OrderService, UsersService, PrismaService],
})
export class OrderModule {}
