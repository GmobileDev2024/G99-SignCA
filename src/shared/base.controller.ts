// import { SECRET } from '../config';
// import * as jwt from 'jsonwebtoken';
import { G99LogsLibService } from '@app/g99-logs-lib';
import { HttpService } from '@nestjs/axios';
import { ApiRes } from './../shared/common.interface';

export class BaseController {

  constructor(
  ) {

   }


  send(data: Object = null, log_content = {}, code: string = 'SUCCESS', message: string = 'Thành công'): ApiRes {

    let res = {
      status: 1,
      code,
      message,
      data
    };
    console.log("Response",res);

    return res;
  }

  error(message: string = 'Thất bại', log_content = {}, data: Object = null, code: string = 'ERROR'): ApiRes {
    let res = {
      status: 0,
      code,
      message,
      data
    };
    console.log("Response",res);

    return res;
  }
}