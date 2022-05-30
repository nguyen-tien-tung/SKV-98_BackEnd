import { Prisma } from '@prisma/client';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { IUser } from './interfaces/user.interface';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ReturnUserDto } from './dto/return-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body() userData: CreateUserDto): Promise<ReturnUserDto> {
    try {
      const salt = await bcrypt.genSalt();
      userData.password = await bcrypt.hash(userData.password, salt);
      const userCreated = await this.usersService.createUser(userData);
      const { password, ...rest } = userCreated;
      return rest;
    } catch (error) {
      console.error(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.user({ id });
  }

  @Get()
  async findAll(): Promise<ReturnUserDto[]> {
    return this.usersService.users({});
  }

  @Patch()
  async updateUser(@Request() req: any) {
    const user = await this.usersService.user({ id: req.user.userId });
    return this.usersService.updateUser({
      where: { id: req.user.userId },
      data: { ...user, ...req.body },
    });
  }

  @Delete()
  deleteUser(@Body() data) {
    return this.usersService.deleteUser(data);
  }
}
