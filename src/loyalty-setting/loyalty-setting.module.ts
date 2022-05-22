import { Module } from '@nestjs/common';
import { LoyaltySettingService } from './loyalty-setting.service';
import { LoyaltySettingController } from './loyalty-setting.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [LoyaltySettingController],
  providers: [LoyaltySettingService, PrismaService],
})
export class LoyaltySettingModule {}
