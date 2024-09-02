import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { User } from "./user/models/user.model";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
// import { JsForceModule } from "@ntegral/nestjs-force";
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    SequelizeModule.forRoot({
      dialect: "mysql",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT,10) || 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [User],
      autoLoadModels: true,
      synchronize: true,
    }),
    // JsForceModule.forRoot({
    //   username: "your your name for salesforce provided",
    //   password: "your password",
    //   security_token: "security token form salesforce provided",
    //   options: {
    //     loginUrl: "loginUrl provided by salesforce",
    //   },
    // }),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
