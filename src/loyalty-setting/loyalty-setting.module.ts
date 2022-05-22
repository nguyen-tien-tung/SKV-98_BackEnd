import { Module } from '@nestjs/common';
import { LoyaltySettingService } from './loyalty-setting.service';
import { LoyaltySettingController } from './loyalty-setting.controller';

@Module({
  controllers: [LoyaltySettingController],
  providers: [LoyaltySettingService]
})
export class LoyaltySettingModule {}
