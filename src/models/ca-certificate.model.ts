import { ICertificateInfo, IUserCertificate } from 'src/interfaces/index';

export class CaCertificateModel implements ICertificateInfo {
  status_code: number;
  message: string;
  transaction_id: string | null;
  certificates: IUserCertificate[];

  constructor(data: Partial<CaCertificateModel>) {
    Object.assign(this, data);
  }
}