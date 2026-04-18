import { ISignResponse } from 'src/interfaces/index';

export class CaSignModel implements ISignResponse {
  status_code: number;
  message: string;
  transaction_id: string | null;
  tran_code?: string | null;
  expired_in?: number | null;

  constructor(data: Partial<CaSignModel>) {
    Object.assign(this, data);
  }
}