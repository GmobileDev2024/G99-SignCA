import { G99LogsLibService } from '@app/g99-logs-lib';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LogsApi } from './logs-api';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    constructor(
    ) {
    }
    use(req: Request, res: Response, next: NextFunction) {
        // console.log('Request...', req);
        const { httpVersion, headers, method, baseUrl, params, query, body, ip } = req;
        console.log(baseUrl, method, body, params);
        res.on('close', () => {
            const { statusCode } = res;
            console.log(`${method} ${statusCode}`)
        });
        next();
    }
}