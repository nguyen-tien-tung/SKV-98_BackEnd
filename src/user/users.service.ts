import { Injectable } from '@nestjs/common';
import { IUser } from './interfaces/user.interface';
import { PrismaService } from '../prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<{ [key: string]: any } | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
      select: {
        id: true,
        name: true,
        username: true,
        phoneNumber: true,
        email: true,
        state: true,
        shoppingCart: true,
        loyaltySetting: true,
        address: true,
        dateOfBirth: true,
        totalPoints: true,
        loyaltySettingId: true,
      },
    });
  }
  async userWithPassword(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<{ [key: string]: any } | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
      select: {
        id: true,
        name: true,
        username: true,
        phoneNumber: true,
        email: true,
        state: true,
        shoppingCart: true,
        loyaltySetting: true,
        loyaltySettingId: true,
        address: true,
        dateOfBirth: true,
        totalPoints: true,
        password: true,
      },
    });
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    if (data.username == 'admin') data.state = 'ADMIN';
    return this.prisma.user.create({ data });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    try {
      const { where, data } = params;
      return this.prisma.user.update({
        data,
        where,
      });
    } catch (error) {}
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }
}
