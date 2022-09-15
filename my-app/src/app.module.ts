import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { User } from "./user/models/user.model";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { JsForceModule } from "@ntegral/nestjs-force";

@Module({
  imports: [
    AuthModule,
    UserModule,
    SequelizeModule.forRoot({
      dialect: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "password",
      database: "test",
      models: [User],
      autoLoadModels: true,
      synchronize: true,
    }),
    JsForceModule.forRoot({
      username: "your your name for salesforce provided",
      password: "your password",
      security_token: "security token form salesforce provided",
      options: {
        loginUrl: "loginUrl provided by salesforce",
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
