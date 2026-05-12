import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class VnptSmartCaLibService {
  private readonly serviceUrl: string;
  private readonly spId: string;
  private readonly spPassword: string;
  private readonly userId: string;

  constructor(private readonly httpService: HttpService) {
    this.serviceUrl =
      process.env.VNPT_SMARTCA_URL || 'https://gwsca.vnpt.vn/sca/sp769';
    this.spId = process.env.VNPT_SMARTCA_SP_ID || '4928-639122778282408906.apps.smartcaapi.com';
    this.spPassword = process.env.VNPT_SMARTCA_SP_PASSWORD || 'MGJmODZjYTc-YTBlNS00OTI4';
    this.userId = process.env.VNPT_SMARTCA_SP_USERID || '001080003113';
  }

  async getCertificate(transactionId: string, serialNumber?: string) {
    const body = {
      sp_id: this.spId,
      sp_password: this.spPassword,
      user_id: this.userId,
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
      user_id: this.userId,
      transaction_id: payload.transaction_id,
      transaction_desc: payload.transaction_desc || '',
      serial_number: payload.serial_number || '',
      time_stamp: payload.time_stamp || '',
      sign_files: payload.sign_files,
    };

    try {
    const res = await this.httpService.axiosRef.post(
      `${this.serviceUrl}/v1/signatures/sign`,
      body,
      {
        headers: { 'Content-Type': 'application/json' },
        timeout: 1000 * 40,
      },
    );

   return res.data;
  } catch (e) {
    console.log(
      'SIGN ERROR RESPONSE:',
      JSON.stringify(e.response?.data, null, 2),
    );

    throw e;
  }
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