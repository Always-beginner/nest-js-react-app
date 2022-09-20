import { SequelizeModule } from "@nestjs/sequelize";
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { UserMiddleware } from "./user.middleware";
import { User } from "./models/user.model";

@Module({
  // imports: [SequelizeModule.forFeature([User])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}

// local middleware example
// export class UserModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     try {
//       consumer.apply(UserMiddleware).forRoutes('user')
//     } catch (error) {
//       throw new Error('Method not implemented.');
//     }
//   }
// }
