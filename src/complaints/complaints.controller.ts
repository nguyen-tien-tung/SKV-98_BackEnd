import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ComplaintsService } from './complaints.service';
import { CreateComplaintDto } from './dto/create-complaint.dto';
import { UpdateComplaintDto } from './dto/update-complaint.dto';
import { UsersService } from '../user/users.service';

@Controller('complaints')
export class ComplaintsController {
  constructor(
    private readonly complaintsService: ComplaintsService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  create(@Body() createComplaintDto: CreateComplaintDto) {
    let user;
    if (createComplaintDto.phoneNumberOrEmail.includes('@'))
      user = this.usersService.user({
        email: createComplaintDto.phoneNumberOrEmail,
      });
    else
      user = this.usersService.user({
        phoneNumber: createComplaintDto.phoneNumberOrEmail,
      });
    return this.complaintsService.createCustomerComplaint({
      ...createComplaintDto,
      user,
    });
  }

  @Get()
  findAll() {
    return this.complaintsService.customerComplaint({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.complaintsService.customerComplaint({ id });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateComplaintDto: UpdateComplaintDto,
  ) {
    let user;
    if (updateComplaintDto.phoneNumberOrEmail.includes('@'))
      user = this.usersService.user({
        email: updateComplaintDto.phoneNumberOrEmail,
      });
    else
      user = this.usersService.user({
        phoneNumber: updateComplaintDto.phoneNumberOrEmail,
      });
    return this.complaintsService.updateCustomerComplaint({
      where: { id },
      data: { ...updateComplaintDto, user },
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.complaintsService.deleteCustomerComplaint({ id });
  }
}
