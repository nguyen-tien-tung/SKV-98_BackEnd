import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from 'src/user/users.service';

@Controller('order')
@UseGuards(JwtAuthGuard)
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto, @Request() req: any) {
    const user = await this.usersService.user({ id: req.user.userId });
    if (!user) return;
    return this.orderService.createOrder({
      ...createOrderDto,
      userId: req.user.userId,
    });
  }

  @Get()
  findAll() {
    return this.orderService.orders({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.order({ id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.updateOrder({
      where: { id },
      data: updateOrderDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.deleteOrder({ id });
  }
}
