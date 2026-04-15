import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder, ApiBasicAuth } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './shared/http-exception.filter';
import helmet from 'helmet'
import { ValidationPipe } from '@nestjs/common';
import * as basicAuth from 'express-basic-auth';
import { AppService } from './app.service';
import { G99LogsLibService } from '@app/g99-logs-lib';
var bodyParser = require('body-parser');

async function bootstrap() {
  const appOptions = {
    cors: true
  };
  const app = await NestFactory.create(AppModule,appOptions);
  app.setGlobalPrefix('api');

  app.useGlobalFilters(new HttpExceptionFilter())
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());
  app.use(bodyParser.json({
    limit: '50mb'
  }));
  // app.enableCors()
  // app.enableCors({
  //   allowedHeaders: '*',
  //   origin: '*',
  //   credentials: true,
  // });

  const options = new DocumentBuilder()
    .setTitle('G99 OCR')
    .setDescription('G99 OCR API description - 2022')
    .setVersion('1.0')
    .setBasePath('nofication/api')
    .addBearerAuth()
    // .addServer("http://10.9.5.149:5000")
    .build();
    
    app.use(
      [
        '/docs', 
        '/docs-json'
      ],
      basicAuth({
          challenge: true,
          users: {
              gmobile: process.env.PASS_API,
          },
      }),
  );
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/docs', app, document);

  await app.listen(process.env.PORT);

  //luu route sang core g99 ve phan quyen
  // const appService = app.get(AppService);
  // appService.loadRoute(null);
}
bootstrap();
