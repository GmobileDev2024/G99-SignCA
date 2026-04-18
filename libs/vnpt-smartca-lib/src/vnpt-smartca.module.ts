import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { VnptSmartCaLibService } from './vnpt-smartca-lib.service';

@Module({
  imports:[
    HttpModule
  ],
  providers: [VnptSmartCaLibService],
  exports: [VnptSmartCaLibService],
})
export class VnptSmartCaLibModule {}
