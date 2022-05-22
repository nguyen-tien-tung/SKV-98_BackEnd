import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Voucher, Prisma } from '@prisma/client';

@Injectable()
export class VoucherService {
  constructor(private prisma: PrismaService) {}

  async voucher(
    voucherWhereUniqueInput: Prisma.VoucherWhereUniqueInput,
  ): Promise<Voucher | null> {
    return this.prisma.voucher.findUnique({
      where: voucherWhereUniqueInput,
    });
  }

  async vouchers(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.VoucherWhereUniqueInput;
    where?: Prisma.VoucherWhereInput;
    orderBy?: Prisma.VoucherOrderByWithRelationInput;
  }): Promise<Voucher[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.voucher.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createVoucher(data: Prisma.VoucherCreateInput): Promise<Voucher> {
    return this.prisma.voucher.create({
      data,
    });
  }
  async updateVoucher(params: {
    where: Prisma.VoucherWhereUniqueInput;
    data: Prisma.VoucherUpdateInput;
  }): Promise<Voucher> {
    const { where, data } = params;
    return this.prisma.voucher.update({
      data,
      where,
    });
  }

  async deleteVoucher(where: Prisma.VoucherWhereUniqueInput): Promise<Voucher> {
    return this.prisma.voucher.delete({
      where,
    });
  }
}
