import { Injectable } from '@nestjs/common';
import { VnptSmartCaLibService } from 'libs/vnpt-smartca-lib/src/vnpt-smartca-lib.service';
import { CaDriver } from 'src/class/ca-driver.class';
import {
  ICertificateInfo,
  ISignResponse,
  ITransactionStatus,
} from 'src/interfaces';
import { CaCertificateModel } from 'src/models/ca-certificate.model';
import { CaSignModel } from 'src/models/ca-sign.model';
import { CaTransactionStatusModel } from 'src/models/ca-transaction-status.model';
import { CaDriverType } from 'src/shared/constant';

@Injectable()
export class VnptSmartCaDriverService extends CaDriver {
  type: CaDriverType = CaDriverType.VNPT_SMARTCA;

  constructor(private readonly vnptSmartCaLibService: VnptSmartCaLibService) {
    super();
  }

  async getCertificate(
    userId: string,
    transactionId: string,
    serialNumber?: string,
  ): Promise<ICertificateInfo> {
    const r = await this.vnptSmartCaLibService.getCertificate(
      userId,
      transactionId,
      serialNumber,
    );

    if (r.status) return this.getCertificateModel(r.data);
    return null;
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
    const r = await this.vnptSmartCaLibService.sign(payload);

    if (r.status) return this.getSignResponseModel(r.data);
    return null;
  }

  async getTransactionStatus(
    transactionId: string,
  ): Promise<ITransactionStatus> {
    const r = await this.vnptSmartCaLibService.getTransactionStatus(
      transactionId,
    );

    if (r.status) return this.getTransactionStatusModel(r.data);
    return null;
  }

  getCertificateModel(data: any): ICertificateInfo {
    console.log('getCertificateModel data :>> ', data);

    const certificates = (data?.data?.user_certificates || []).map((item) => ({
      cert_id: item.cert_id || 'N/A',
      serial_number: item.serial_number || 'N/A',
      cert_status: item.cert_status || 'N/A',
      cert_status_code: item.cert_status_code || 'N/A',
      cert_valid_from: item.cert_valid_from || 'N/A',
      cert_valid_to: item.cert_valid_to || 'N/A',
      cert_data: item.cert_data || 'N/A',
      chain_data: item.chain_data || null,
      service_type: item.service_type || 'N/A',
      service_name: item.service_name || 'N/A',
      service_pricingcode: item.service_pricingcode || 'N/A',
      cert_subject: item.cert_subject || 'N/A',
      device: item.device || null,
      name: item.name || null,
    }));

    const model: ICertificateInfo = {
      status_code: data?.status_code || 500,
      message: data?.message || 'N/A',
      transaction_id:
        data?.data?.user_certificates?.[0]?.transaction_id || null,
      certificates,
    };

    return new CaCertificateModel(model);
  }

  getSignResponseModel(data: any): ISignResponse {
    console.log('getSignResponseModel data :>> ', data);

    const model: ISignResponse = {
      status_code: data?.status_code || 500,
      message: data?.message || 'N/A',
      transaction_id: data?.data?.transaction_id || null,
      tran_code: data?.data?.tran_code || null,
      expired_in: data?.data?.expired_in || null,
    };

    return new CaSignModel(model);
  }

  getTransactionStatusModel(data: any): ITransactionStatus {
    console.log('getTransactionStatusModel data :>> ', data);

    const model: ITransactionStatus = {
      status_code: data?.status_code || 500,
      message: data?.message || 'N/A',
      transaction_id: data?.data?.transaction_id || null,
      signatures: (data?.data?.signatures || []).map((item) => ({
        doc_id: item.doc_id || 'N/A',
        signature_value: item.signature_value || 'N/A',
        timestamp_signature: item.timestamp_signature || null,
      })),
    };

    return new CaTransactionStatusModel(model);
  }
}