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
  Res,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';

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
  async create(
    @Body() userData: CreateUserDto,
    @Res() res: Response,
  ): Promise<ReturnUserDto> {
    try {
      const salt = await bcrypt.genSalt();
      userData.password = await bcrypt.hash(userData.password, salt);
      const userCreated = await this.usersService.createUser(userData);
      // if (userCreated) {
      const { password, ...rest } = userCreated;
      return rest;
      // }
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          console.log(
            'There is a unique constraint violation, a new user cannot be created with this email',
          );
        }
      }
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send(
          'There is a unique constraint violation, a new user cannot be created',
        );
      // throw e;
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
    try {
      const user = await this.usersService.user({ id: req.user.userId });
      delete req.body.loyaltySetting;
      return this.usersService.updateUser({
        where: { id: req.user.userId },
        data: {
          ...req.body,
          username: user.username,
          // name: user.name ?? req.body.name,
        },
      });
    } catch (error) {}
  }

  @Delete()
  deleteUser(@Body() data) {
    return this.usersService.deleteUser(data);
  }
}
