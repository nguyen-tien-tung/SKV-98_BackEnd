import { Test, TestingModule } from '@nestjs/testing';
import { LoyaltySettingService } from './loyalty-setting.service';

describe('LoyaltySettingService', () => {
  let service: LoyaltySettingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoyaltySettingService],
    }).compile();

    service = module.get<LoyaltySettingService>(LoyaltySettingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
