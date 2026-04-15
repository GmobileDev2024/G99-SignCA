import { Module } from '@nestjs/common';
import { Ocr247Service } from './ocr-247.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports:[
    HttpModule
  ],
  providers: [Ocr247Service],
  exports: [Ocr247Service],
})
export class Ocr247Module {}
