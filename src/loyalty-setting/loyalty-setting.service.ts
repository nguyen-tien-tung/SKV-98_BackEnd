import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { LoyaltySetting, Prisma } from '@prisma/client';

@Injectable()
export class LoyaltySettingService {
  constructor(private prisma: PrismaService) {}

  async loyaltySetting(
    loyaltySettingWhereUniqueInput: Prisma.LoyaltySettingWhereUniqueInput,
  ): Promise<LoyaltySetting | null> {
    return this.prisma.loyaltySetting.findUnique({
      where: loyaltySettingWhereUniqueInput,
    });
  }

  async loyaltySettings(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.LoyaltySettingWhereUniqueInput;
    where?: Prisma.LoyaltySettingWhereInput;
    orderBy?: Prisma.LoyaltySettingOrderByWithRelationInput;
  }): Promise<LoyaltySetting[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.loyaltySetting.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createLoyaltySetting(
    data: Prisma.LoyaltySettingCreateInput,
  ): Promise<LoyaltySetting> {
    return this.prisma.loyaltySetting.create({
      data,
    });
  }

  async updateLoyaltySetting(params: {
    where: Prisma.LoyaltySettingWhereUniqueInput;
    data: Prisma.LoyaltySettingUpdateInput;
  }): Promise<LoyaltySetting> {
    const { data, where } = params;
    return this.prisma.loyaltySetting.update({
      data,
      where,
    });
  }

  async deleteLoyaltySetting(
    where: Prisma.LoyaltySettingWhereUniqueInput,
  ): Promise<LoyaltySetting> {
    return this.prisma.loyaltySetting.delete({
      where,
    });
  }
}
