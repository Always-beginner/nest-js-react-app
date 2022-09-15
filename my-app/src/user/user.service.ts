import { UpdateUserDto } from "./dto/update-user.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./models/user.model";
import { Client, InjectJsForce } from "@ntegral/nestjs-force";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    @InjectJsForce() private readonly client: Client
  ) {}
  async getAllUser() {
    try {
      const res = await this.client.conn.sobject("users__c").find();
      return res;
      // return await this.userModel.findAll();
    } catch (error) {
      throw error;
    }
  }
  async getUser(userId: number) {
    try {
      const res = await this.client.conn
        .sobject("users__c")
        .findOne({ id__c: userId });
      if (!res) {
        return { error: "User Not found" };
      }
      return res;
    } catch (error) {
      throw error;
    }
  }
  async createUser(createUserDto: CreateUserDto) {
    try {
      let result = await this.client.conn
        .sobject("users__c")
        .create(createUserDto);
      if (result.success) {
        return { message: "User Create Successfully" };
      }
    } catch (error) {
      throw error;
    }
  }
  async updateUser(userId: number, updateUserDto: UpdateUserDto) {
    try {
      let user = await this.client.conn
        .sobject("users__c")
        .find({ id__c: userId })
        .update(updateUserDto);
      console.log(JSON.stringify(user));
      if (user) {
        return {
          message: "User Updated successfully",
        };
      }
      return { message: "User not found" };
    } catch (error) {
      throw error;
    }
  }
  async deleteUser(userId: number) {
    try {
      let result = await this.client.conn
        .sobject("users__c")
        .find({ id__c: userId })
        .destroy();
      if (result) {
        return { message: "Deleted successfully" };
      }
      return { message: "Items Not found" };
    } catch (error) {
      throw error;
    }
  }
}
