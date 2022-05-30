import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/user/users.service';
import { ReturnUserDto } from '../user/dto/return-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    usernameOrPhoneNumber: string,
    password: string,
  ): Promise<ReturnUserDto | null> {
    let user = await this.usersService.userWithPassword({
      phoneNumber: usernameOrPhoneNumber,
    });
    if (!user) {
      user = await this.usersService.userWithPassword({
        username: usernameOrPhoneNumber,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (user && isMatch) {
      const { password, ...result } = user;
      return result as any;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
      userInfo: user,
    };
  }
}
