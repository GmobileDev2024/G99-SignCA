import { Injectable } from '@nestjs/common';
import { CaDriver } from 'src/class/ca-driver.class';
import {
  ICertificateInfo,
  ISignResponse,
  ITransactionStatus,
} from 'src/interfaces';
import { CaDriverType } from 'src/shared/constant';
import { VnptSmartCaDriverService } from './driver';

@Injectable()
export class CaService {
  constructor(
    private readonly vnptSmartCaDriverService: VnptSmartCaDriverService,
  ) {}

  findDriver(type: string = null): CaDriver {
    const selectedDriver =
      type || process.env.CA_DRIVER || CaDriverType.VNPT_SMARTCA;

    const driverMap: Record<string, CaDriver> = {
      [CaDriverType.VNPT_SMARTCA]: this.vnptSmartCaDriverService,
    };

    return driverMap[selectedDriver] || this.vnptSmartCaDriverService;
  }

  async getCertificate(
    userId: string,
    transactionId: string,
    serialNumber?: string,
  ): Promise<ICertificateInfo> {
    return this.findDriver().getCertificate(
      userId,
      transactionId,
      serialNumber,
    );
  }

  async sign(payload: {
    user_id: string;
    transaction_id: string;
    transaction_desc?: string;
    serial_number?: string;
    time_stamp?: string;
    sign_files: Array<{
      data_to_be_signed: string;
      doc_id: string;
      file_type: string;
      sign_type: string;
    }>;
  }): Promise<ISignResponse> {
    return this.findDriver().sign(payload);
  }

  async getTransactionStatus(
    transactionId: string,
  ): Promise<ITransactionStatus> {
    return this.findDriver().getTransactionStatus(transactionId);
  }
}