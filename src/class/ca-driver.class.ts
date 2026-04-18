import {
  ICertificateInfo,
  ISignResponse,
  ITransactionStatus,
} from 'src/interfaces';
import { CaDriverType } from 'src/shared/constant';

export abstract class CaDriver {
  abstract type: CaDriverType;

  abstract getCertificate(
    userId: string,
    transactionId: string,
    serialNumber?: string,
  ): Promise<ICertificateInfo>;

  abstract sign(payload: {
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
  }): Promise<ISignResponse>;

  abstract getTransactionStatus(
    transactionId: string,
  ): Promise<ITransactionStatus>;

  abstract getCertificateModel(data: any): ICertificateInfo;
  abstract getSignResponseModel(data: any): ISignResponse;
  abstract getTransactionStatusModel(data: any): ITransactionStatus;
}