import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { G99LogsLibService } from './g99-logs-lib.service';

@Module({
  imports: [
    HttpModule,
  ],
  providers: [G99LogsLibService],
  exports: [G99LogsLibService],
})
export class G99LogsLibModule {}
