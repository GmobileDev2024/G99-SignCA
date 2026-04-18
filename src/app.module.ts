import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerMiddleware } from './shared/logger.middleware';
import { AuthMiddleware } from './shared/auth.middleware';
import { HttpModule } from '@nestjs/axios';
import { OcrService } from './service/ocr.service';

import { Ocr247Module } from '@app/ocr-247';
import { Ocr247DriverService } from './service/driver/ocr-247-driver.service';
import { VnptSmartCaLibModule } from 'libs/vnpt-smartca-lib/src/vnpt-smartca.module';
import { VnptSmartCaDriverService } from './service/driver';
import { CaService } from './service/ca.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.app.env'],
    }),
    CacheModule.register(),
    HttpModule,
    Ocr247Module,
    VnptSmartCaLibModule
  ],
  controllers: [
    AppController
  ],
  providers: [AppService, OcrService, Ocr247DriverService, VnptSmartCaDriverService, CaService],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes("*");
    consumer
      .apply(AuthMiddleware)
      .forRoutes('*');
  }
}
