import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LoyaltySettingService } from './loyalty-setting.service';
import { CreateLoyaltySettingDto } from './dto/create-loyalty-setting.dto';
import { UpdateLoyaltySettingDto } from './dto/update-loyalty-setting.dto';

@Controller('loyalty-setting')
export class LoyaltySettingController {
  constructor(private readonly loyaltySettingService: LoyaltySettingService) {}

  @Post()
  create(@Body() createLoyaltySettingDto: CreateLoyaltySettingDto) {
    return this.loyaltySettingService.createLoyaltySetting(
      createLoyaltySettingDto,
    );
  }

  @Get()
  findAll() {
    return this.loyaltySettingService.loyaltySettings({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loyaltySettingService.loyaltySetting({ id: +id });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLoyaltySettingDto: UpdateLoyaltySettingDto,
  ) {
    return this.loyaltySettingService.updateLoyaltySetting({
      where: { id: +id },
      data: updateLoyaltySettingDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loyaltySettingService.deleteLoyaltySetting({ id: +id });
  }
}
