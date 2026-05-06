import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Req, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { BaseController } from './shared';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
const fs = require('fs');
import * as moment from 'moment';
import { ApiCreatedResponse, ApiProperty, ApiResponse } from '@nestjs/swagger';
import { CaCertificateModel } from './models/ca-certificate.model';
import { GetCertificateDto } from './dto/get-certificate.dto';
import { CaSignModel } from './models/ca-sign.model';
import { SignRequestDto } from './dto/sign.dto';
import { CaTransactionStatusModel } from './models/ca-transaction-status.model';
const crypto = require("crypto");
@Controller('app')
export class AppController extends BaseController {
    constructor(
        private appService: AppService
    ) {
        super()
    }

    @Post('certificate')
    @ApiCreatedResponse({
        description: 'Success',
        type: CaCertificateModel,
    })
    async getCertificate(@Body() dto: GetCertificateDto) {
        const r = await this.appService.getCertificate(dto);
        return this.send(r);
    }

    @Post('sign')
    @ApiCreatedResponse({
        description: 'Success',
        type: CaSignModel,
    })
    async sign(@Body() dto: SignRequestDto) {
        const r = await this.appService.sign(dto);
        return this.send(r);
    }

    @Get('sign/:transactionId/status')
    @ApiCreatedResponse({
        description: 'Success',
        type: CaTransactionStatusModel,
    })
    async getStatus(@Param('transactionId') transactionId: string) {
        const r = await this.appService.getSignStatus(transactionId);
        return this.send(r);
    }
}
