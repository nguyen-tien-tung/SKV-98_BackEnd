import { Module } from '@nestjs/common';
import { ComplaintsService } from './complaints.service';
import { ComplaintsController } from './complaints.controller';
import { UsersService } from '../user/users.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [ComplaintsController],
  providers: [ComplaintsService, UsersService, PrismaService],
})
export class ComplaintsModule {}
