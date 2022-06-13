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
import { OrderRequestState } from '@prisma/client';

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
    const returnedOrder = this.orderService.createOrder({
      ...createOrderDto,
      userId: req.user.userId,
      items: user.shoppingCart,
    });
    delete user.loyaltySetting;
    this.usersService.updateUser({
      where: { id: req.user.userId },
      data: { ...user, shoppingCart: {} },
    });
    return returnedOrder;
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

  @Post('updateMany')
  updateMany(@Body() reqBody: { ids: string[]; newState: OrderRequestState }) {
    return this.orderService.updateOrders({
      where: {
        id: {
          in: reqBody.ids,
        },
      },
      data: {
        state: reqBody.newState,
      },
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.deleteOrder({ id });
  }
}
