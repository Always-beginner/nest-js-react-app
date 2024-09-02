import { User } from "./../user/models/user.model";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { JwtService } from "@nestjs/jwt";
import { LoginAuthDto } from "./dto/login.dto";
import * as sf from "jsforce";
import { Client, InjectJsForce } from "@ntegral/nestjs-force";
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    // @InjectJsForce() private readonly client: Client,
    private jwtService: JwtService
  ) {}

  async findByEmail(email: string) {
    // const res = await this.client.conn
    //   .sobject("users__c")
    //   .findOne({ email__c: email });
    // return res;
    return await this.userModel.findOne({    // used for sequelize for mysql database
      where: { email },
    });
  }

  async validateUser(email: string, password: string) {
    const user: any = await this.findByEmail(email);
    if (user && user.password__c === password) {
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
