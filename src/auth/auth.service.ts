import { Injectable } from '@nestjs/common';
import { compareSync } from 'bcrypt';
import { UserModel } from '../users/User.model';
import { UserService } from 'src/users/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async loginWithToken(user) {
    const payload = { sub: user.id, email: user.email };

    return { token: this.jwtService.sign(payload) };
  }

  async validateUser(email: string, password: string) {
    let user: UserModel;
    try {
      user = await this.userService.findOneOrFail({ where: { email } });
    } catch (error) {
      return null;
    }

    const isPasswordValid = compareSync(password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    return user;
  }
}
