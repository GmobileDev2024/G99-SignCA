import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class G99LogsLibService {
    headers = {};
    serviceUrl = "";

    constructor(
        readonly httpService: HttpService
    ) {
        this.serviceUrl = process.env.LOGS_SERVICE || "http://localhost:3001"
        this.headers = {
            service_api: process.env.PREFIX_LOGS_SERVICE,
            key_api: process.env.KEY_API_LOGS_SERVICE
        }
    }

    async writeLog(data) {
        const headers = this.headers
        const config = {
            method: 'POST',
            url: this.serviceUrl + '/api/jlog',
            headers: headers,
            data: data
        };
        let res;
        try {
            res = await this.httpService.axiosRef(config);   
        } catch (error) {
            console.log(error);
        }
        return res?.data
    }

    async readLog(params) {
        
    }
}
