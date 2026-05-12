import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import { FptAiService } from '@app/fpt-ai';
import { join } from 'path';

import { GetCertificateDto } from './dto/get-certificate.dto';
import { SignRequestDto } from './dto/sign.dto';
import { CaService } from './service/ca.service';
var fs = require('fs')
@Injectable()
export class AppService {
  constructor(
    // private readonly fptaiService: FptAiService,
    private readonly caService: CaService,
  ) {

  }
  async getCertificate(dto: GetCertificateDto) {
    return this.caService.getCertificate(
      dto.transaction_id,
      dto.serial_number,
    );
  }

  async sign(dto: SignRequestDto) {
    return this.caService.sign(dto);
  }

  async getSignStatus(transactionId: string) {
    return this.caService.getTransactionStatus(transactionId);
  }




}
