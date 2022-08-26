import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserService } from "./user.service";

@ApiBearerAuth("JWT-auth")
@ApiTags("UserCrud")
@UseGuards(AuthGuard("jwt"))
@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}
  @Get("/getAllUsers")
  getAllUsesrs() {
    return this.userService.getAllUser();
  }
  @Get("/:userId")
  @ApiParam({ name: "userId", type: "number" })
  getUser(@Param() params) {
    return this.userService.getUser(params.userId);
  }
  @Post("/createUser")
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
  @Patch("/updateUser/:userId")
  @ApiParam({ name: "userId", type: "number" })
  updateUser(@Param() params, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(params.userId, updateUserDto);
  }
  @Delete("/deleteUser/:userId")
  @ApiParam({ name: "userId", type: "number" })
  deleteUser(@Param() params) {
    return this.userService.deleteUser(params.userId);
  }
}
