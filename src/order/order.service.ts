import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Order, Prisma } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async order(
    productWhereUniqueInput: Prisma.OrderWhereUniqueInput,
  ): Promise<Order | null> {
    return this.prisma.order.findUnique({
      where: productWhereUniqueInput,
    });
  }

  async orders(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.OrderWhereUniqueInput;
    where?: Prisma.OrderWhereInput;
    orderBy?: Prisma.OrderOrderByWithRelationInput;
  }): Promise<Order[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.order.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createOrder(data: Prisma.OrderUncheckedCreateInput): Promise<Order> {
    return this.prisma.order.create({
      data,
    });
  }

  async updateOrder(params: {
    where: Prisma.OrderWhereUniqueInput;
    data: Prisma.OrderUpdateInput;
  }): Promise<Order> {
    const { data, where } = params;
    return this.prisma.order.update({
      data,
      where,
    });
  }

  async updateOrders(params: {
    data: Prisma.XOR<
      Prisma.OrderUpdateManyMutationInput,
      Prisma.OrderUncheckedUpdateManyInput
    >;
    where: Prisma.OrderWhereInput;
  }): Promise<Prisma.BatchPayload> {
    const { data, where } = params;
    return this.prisma.order.updateMany({
      data,
      where,
    });
  }

  async deleteOrder(where: Prisma.OrderWhereUniqueInput): Promise<Order> {
    return this.prisma.order.delete({
      where,
    });
  }
}
