import { ITransactionStatus, ITransactionSignature } from 'src/interfaces/index';

export class CaTransactionStatusModel implements ITransactionStatus {
  status_code: number;
  message: string;
  transaction_id: string | null;
  signatures: ITransactionSignature[];

  constructor(data: Partial<CaTransactionStatusModel>) {
    Object.assign(this, data);
  }
}