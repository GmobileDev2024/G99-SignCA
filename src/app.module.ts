import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerMiddleware } from './shared/logger.middleware';
import { AuthMiddleware } from './shared/auth.middleware';
import { HttpModule } from '@nestjs/axios';
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
    VnptSmartCaLibModule
  ],
  controllers: [
    AppController
  ],
  providers: [AppService, VnptSmartCaDriverService, CaService],
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
