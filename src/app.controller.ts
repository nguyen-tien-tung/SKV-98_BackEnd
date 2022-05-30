import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  HttpCode,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { UnauthorizedException } from '@nestjs/common';
import { UsersService } from './user/users.service';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('auth/login')
  async login(@Request() req) {
    const user = await this.authService.validateUser(
      req.body.usernameOrPhoneNumber,
      req.body.password,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return await this.usersService.user({ id: req.user.userId });
  }
}
