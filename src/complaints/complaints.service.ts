import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CustomerComplaint, Prisma } from '@prisma/client';

@Injectable()
export class ComplaintsService {
  constructor(private prisma: PrismaService) {}

  async customerComplaint(
    CustomerComplaintWhereUniqueInput: Prisma.CustomerComplaintWhereUniqueInput,
  ): Promise<CustomerComplaint | null> {
    return this.prisma.customerComplaint.findUnique({
      where: CustomerComplaintWhereUniqueInput,
    });
  }

  async customerComplaints(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CustomerComplaintWhereUniqueInput;
    where?: Prisma.CustomerComplaintWhereInput;
    orderBy?: Prisma.CustomerComplaintOrderByWithRelationInput;
  }): Promise<CustomerComplaint[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.customerComplaint.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createCustomerComplaint(
    data: Prisma.CustomerComplaintCreateInput,
  ): Promise<CustomerComplaint> {
    return this.prisma.customerComplaint.create({
      data,
    });
  }

  async updateCustomerComplaint(params: {
    where: Prisma.CustomerComplaintWhereUniqueInput;
    data: Prisma.CustomerComplaintUpdateInput;
  }): Promise<CustomerComplaint> {
    const { where, data } = params;
    return this.prisma.customerComplaint.update({
      data,
      where,
    });
  }

  async deleteCustomerComplaint(
    where: Prisma.CustomerComplaintWhereUniqueInput,
  ): Promise<CustomerComplaint> {
    return this.prisma.customerComplaint.delete({
      where,
    });
  }
}
