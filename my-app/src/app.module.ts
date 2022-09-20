import { Module } from "@nestjs/common";
// import { SequelizeModule } from "@nestjs/sequelize";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
// import { User } from "./user/models/user.model";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { JsForceModule } from "@ntegral/nestjs-force";

@Module({
  imports: [
    AuthModule,
    UserModule,
    // SequelizeModule.forRoot({
    //   dialect: "mysql",
    //   host: "localhost",
    //   port: 3306,
    //   username: "root",
    //   password: "password",
    //   database: "test",
    //   models: [User],
    //   autoLoadModels: true,
    //   synchronize: true,
    // }),
    JsForceModule.forRoot({
      username: "beyounick00724@gmail.com",
      password: "nick@5525",
      security_token: "5rkt1V1aEYLDcRo56bNO5W2Q",
      options: {
        loginUrl: "https://binarybits-dev-ed.my.salesforce.com",
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
