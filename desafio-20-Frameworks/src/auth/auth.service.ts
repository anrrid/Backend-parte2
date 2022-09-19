import { Injectable, HttpException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { checkPassword } from '../utils/passwordEncrypt.util';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.getOne(email);
    if (user && checkPassword(user.password, password)) {
      return user.email;
    }
    return null;
  }

  async register(email: string, password: string): Promise<any> {
    const exists = await this.userService.getOne(email);
    if (exists) throw new HttpException('email ya registrado', 400);
    const user = await this.userService.register(email, password);
    if (user) {
      return user.email;
    }
    return null;
  }
  async returnEmpty() {
    return {};
  }
}
