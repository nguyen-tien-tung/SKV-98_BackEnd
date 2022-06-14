import { ProductService } from './../product/product.service';
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
import { LoyaltySettingService } from 'src/loyalty-setting/loyalty-setting.service';

@Controller('order')
@UseGuards(JwtAuthGuard)
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly usersService: UsersService,
    private readonly productService: ProductService,
    private readonly loyaltySettingService: LoyaltySettingService,
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
  async updateMany(
    @Body() reqBody: { ids: string[]; newState: OrderRequestState },
  ) {
    try {
      const { count } = await this.orderService.updateOrders({
        where: {
          id: {
            in: reqBody.ids,
          },
        },
        data: {
          state: reqBody.newState,
        },
      });
      if (count > 0 && reqBody.newState == 'DONE') {
        const orders = await this.orderService.orders({
          where: { id: { in: reqBody.ids } },
        });
        orders.forEach(async (order) => {
          const user = await this.usersService.user({ id: order.userId });
          const nextLoyaltyLevel =
            await this.loyaltySettingService.loyaltySetting({
              id: user.loyaltySettingId + 1,
            });
          const products = await this.productService.products({
            where: { id: { in: Object.keys(order.items) } },
          });
          let pointsGain = 0;
          products.forEach(async (product) => {
            pointsGain +=
              product.price * 0.01 * user.loyaltySetting.pointGainPerItem;
          });
          await this.usersService.updateUser({
            where: { id: user.id },
            data: {
              totalPoints: user.totalPoints + pointsGain,
              loyaltySetting: {
                connect: {
                  id:
                    nextLoyaltyLevel &&
                    user.totalPoints + pointsGain >=
                      nextLoyaltyLevel.pointRequirement
                      ? nextLoyaltyLevel.id
                      : user.loyaltySettingId,
                },
              },
            },
          });
        });
      }
      return { count };
    } catch (error) {}
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.deleteOrder({ id });
  }
}
