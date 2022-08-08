import { User } from './../user/models/user.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
import { LoginAuthDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private jwtService: JwtService,
  ) {}

  async findByEmail(email: string) {
    return await this.userModel.findOne({
      where: { email },
    });
  }

  async validateUser(email: string, password: string) {
    const user = await this.findByEmail(email);
    if (user && user.password === password) {
      return user;
    }

    return null;
  }

  async login(user: LoginAuthDto) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
