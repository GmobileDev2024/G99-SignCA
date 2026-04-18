import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class VnptSmartCaLibService {
  private readonly serviceUrl: string;
  private readonly spId: string;
  private readonly spPassword: string;

  constructor(private readonly httpService: HttpService) {
    this.serviceUrl =
      process.env.VNPT_SMARTCA_URL || 'https://rmgateway.vnptit.vn/sca/sp769';
    this.spId = process.env.VNPT_SMARTCA_SP_ID || '4184-637127995547330633.apps.signserviceapi.com';
    this.spPassword = process.env.VNPT_SMARTCA_SP_PASSWORD || 'NGNhMzdmOGE-OGM2Mi00MTg0';
  }

  async getCertificate(userId: string, transactionId: string, serialNumber?: string) {
    const body = {
      sp_id: this.spId,
      sp_password: this.spPassword,
      user_id: userId,
      serial_number: serialNumber || '',
      transaction_id: transactionId,
    };

    const res = await this.httpService.axiosRef.post(
      `${this.serviceUrl}/v1/credentials/get_certificate`,
      body,
      {
        headers: { 'Content-Type': 'application/json' },
        timeout: 1000 * 40,
      },
    );
    console.log('getCertificate res :>> ', res);
    return res.data;
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
  }) {
    const body = {
      sp_id: this.spId,
      sp_password: this.spPassword,
      user_id: payload.user_id,
      transaction_id: payload.transaction_id,
      transaction_desc: payload.transaction_desc || '',
      serial_number: payload.serial_number || '',
      time_stamp: payload.time_stamp || '',
      sign_files: payload.sign_files,
    };

    const res = await this.httpService.axiosRef.post(
      `${this.serviceUrl}/v1/signatures/sign`,
      body,
      {
        headers: { 'Content-Type': 'application/json' },
        timeout: 1000 * 40,
      },
    );

    return res.data;
  }

  async getTransactionStatus(transactionId: string) {
    const res = await this.httpService.axiosRef.post(
      `${this.serviceUrl}/v1/signatures/sign/${transactionId}/status`,
      {},
      {
        headers: { 'Content-Type': 'application/json' },
        timeout: 1000 * 40,
      },
    );

    return res.data;
  }
}