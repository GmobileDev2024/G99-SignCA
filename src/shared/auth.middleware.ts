import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { NestMiddleware, HttpStatus, Injectable, ConsoleLogger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { HttpService } from '@nestjs/axios';
import { G99LogsLibService } from '@app/g99-logs-lib';
import { LogsApi } from './logs-api';


@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
  ) { }

  async use(req: Request, res: Response, next: NextFunction) {
    //test ott, remove after test
      const apiKey = req.headers.api_key;
      if (!apiKey || apiKey != process.env.API_KEY) {
        throw new HttpException('Not authorized. - Key', HttpStatus.UNAUTHORIZED);
      }
      
      next();
    
  }
}