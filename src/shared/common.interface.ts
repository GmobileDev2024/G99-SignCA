
import { ApiStatus } from "./constant";

export interface ApiRes {
  status: number;
  code: string;
  message: string;
  data: any;
}


export class ApiResModel {
  status: number;
  code: string;
  message: string;
  data: any;
  constructor() {
    this.status = 0
    this.code = "UNKNOW"
    this.message = "Unknow"
    this.data = {}
  }

  success(_data: any, _message: string = "SUCCESS", _code: string = "SUCCESS",) {
    this.data = _data
    this.status = ApiStatus.SUCCESS
    this.code = _code
    this.message = _message
  }

  failure(_message: string, _code: string = "FAIL", _data: any = []) {
    this.data = _data
    this.status = ApiStatus.FAIL
    this.code = _code
    this.message = _message
  }
}
