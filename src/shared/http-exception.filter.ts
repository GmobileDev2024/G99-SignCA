import { G99LogsLibService } from '@app/g99-logs-lib';
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { LogsApi } from './logs-api';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    
  ) {

  }
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    console.log(exception);
    const excep: any = exception instanceof HttpException ? exception.getResponse() : null;
    let message = excep ? excep.message : 'Đã có lỗi xảy ra vui lòng thử lại sau #5';
    if(excep && Array.isArray(excep.message)){
      message = excep.message.filter(x=> x != "")
      message = message[0];
    }
    if(!message && excep){
      message = excep.errors?.message;
    }
    if(!message && exception instanceof HttpException){
      message = exception.getResponse();
    }
    response
      .status(status)
      .json({
        status: 0,
        code: excep && excep.code ? excep.code : "ERROR",
        message: message,
        data: null,
      });
  }
}