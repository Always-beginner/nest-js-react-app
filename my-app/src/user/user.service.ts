import { UpdateUserDto } from "./dto/update-user.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { Injectable } from "@nestjs/common";
// import { InjectModel } from "@nestjs/sequelize";
// import { User } from "./models/user.model";
import { Client, InjectJsForce } from "@ntegral/nestjs-force";

@Injectable()
export class UserService {
  constructor(
    @InjectJsForce() private readonly client: Client // @InjectModel(User) private userModel: typeof User,
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
  async getUser(userId: string) {
    try {
      const res = await this.client.conn
        .sobject("products")
        .findOne({ Id: userId });
      if (!res) {
        return { error: "User Not found" };
      }
      return res;
    } catch (error) {
      throw error;
    }
  }
  async getProducts(userId: string) {
    const products = await this.client.conn
      .sobject("product__c")
      .find({ user__c: userId });
    return products;
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
  async updateUser(userId: string, updateUserDto: UpdateUserDto) {
    try {
      let user = await this.client.conn
        .sobject("users__c")
        .find({ Id: userId })
        .update(updateUserDto);
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
  async deleteUser(userId: string) {
    try {
      let result = await this.client.conn
        .sobject("users__c")
        .find({ Id: userId })
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
