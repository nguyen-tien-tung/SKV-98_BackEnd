import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VoucherService } from './voucher.service';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
import { UsersService } from '../user/users.service';

@Controller('voucher')
export class VoucherController {
  constructor(private readonly voucherService: VoucherService) {}

  @Post()
  create(@Body() createVoucherDto: CreateVoucherDto) {
    return this.voucherService.createVoucher(createVoucherDto);
  }

  @Get()
  findAll() {
    return this.voucherService.voucher({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.voucherService.voucher({ id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVoucherDto: UpdateVoucherDto) {
    return this.voucherService.updateVoucher({
      where: { id },
      data: updateVoucherDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.voucherService.deleteVoucher({ id });
  }
}
