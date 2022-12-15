import {
  HttpException,
  Injectable,
  OnApplicationBootstrap,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './users/users.services';
import { UserRoleService } from './userRole/user.role.service';

@Injectable()
export class AuthService implements OnApplicationBootstrap {
  constructor(
    private userService: UserService,
    private userRoleService: UserRoleService,
    private jwtService: JwtService,
  ) {}
  async onApplicationBootstrap() {
    await this.userRoleService.createUserRole();
    let getuser = await this.userRoleService.findUser();
    await this.userService.createUserSeeder(getuser);
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (user) {
      const matchPassword = await bcrypt.compare(password, user.password);
      if (!matchPassword) {
        throw new HttpException('Please enter correct credentials', 400);
      }
      return user;
    }
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return { message:"login successfully!!",
      access_token: this.jwtService.sign(payload),
    };
  }
}

