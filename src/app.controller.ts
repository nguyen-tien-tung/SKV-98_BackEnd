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

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

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
  getProfile(@Request() req) {
    return req.user; // user = return from JwtStrategy.validate
  }
}
