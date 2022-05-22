import { Test, TestingModule } from '@nestjs/testing';
import { LoyaltySettingController } from './loyalty-setting.controller';
import { LoyaltySettingService } from './loyalty-setting.service';

describe('LoyaltySettingController', () => {
  let controller: LoyaltySettingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoyaltySettingController],
      providers: [LoyaltySettingService],
    }).compile();

    controller = module.get<LoyaltySettingController>(LoyaltySettingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
