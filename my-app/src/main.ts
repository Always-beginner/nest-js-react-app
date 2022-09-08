import { NestFactory } from "@nestjs/core";
import { NextFunction, Request, Response } from "express";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";
import helmet from "helmet";
// import * as csurf from 'csurf';

// global middleware
// function globalMiddleware(req: Request, res: Response, next: NextFunction) {
//   let protocol = req.protocol;
//   let host = req.get('host');
//   let url = req.originalUrl;
//   let method = req.method;
//   let date = new Date().toDateString();
//   console.log(protocol + '://' + host + url + '  ' + method + '   ' + date);
//   next();
// }

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("API");
  // app.use(globalMiddleware);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    })
  );
  app.use(helmet());
  app.enableCors();
  // csrf token
  // app.use(csurf());

  // swagger  documentation
  const options = new DocumentBuilder()
    .setTitle("Crud API")
    .setDescription("this is crud api")
    .setVersion("1.0")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        name: "JWT",
        description: "Enter Jwt token",
        in: "header",
      },
      "JWT-auth"
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, document);
  await app.listen(3000);
}
bootstrap();
