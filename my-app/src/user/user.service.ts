import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async getAllUser(): Promise<User[]> {
    try {
      return await this.userModel.findAll();
    } catch (error) {
      throw error;
    }
  }
  async getUser(userId: number, name: string) {
    try {
      let result = await this.userModel.findOne({
        where: { id: userId, name: name },
      });
      if (!result) {
        return { error: 'User Not found' };
      }
      return result;
    } catch (error) {
      throw error;
    }
  }
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      let result = await this.userModel.create({ ...createUserDto });
      return result;
    } catch (error) {
      throw error;
    }
  }
  async updateUser(userId: number, updateUserDto: UpdateUserDto) {
    try {
      let user = await this.userModel.update(
        { ...updateUserDto },
        {
          where: { id: userId },
        },
      );
      if (user.includes(1)) {
        return {
          message: 'User Updated successfully',
          count: user.includes(1),
        };
      }
      return { message: 'User not found', count: user.includes(1) };
    } catch (error) {
      throw error;
    }
  }
  async deleteUser(userId: number) {
    try {
      let result = await this.userModel.destroy({ where: { id: userId } });
      if (result > 0) {
        return { message: 'Deleted successfully', count: result };
      }
      return { message: 'Items Not found' };
    } catch (error) {
      throw error;
    }
  }
}
