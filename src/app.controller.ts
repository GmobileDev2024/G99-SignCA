import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Req, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { DetectImageDto } from './dto/detect-image-dto';
import { BaseController } from './shared';
import { FaceIDRecognitionDto, IDRecognitionDto } from './dto/id-recognition.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
const fs = require('fs');
import * as moment from 'moment';
import { ApiCreatedResponse, ApiProperty, ApiResponse } from '@nestjs/swagger';
import { OcrFaceIDModel } from './models/ocr-face-id.class';
import { OcrIDModel } from './models/ocr.class';
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

    @Post('detect-text')
    async detectText(
        @Body() dto: DetectImageDto
    ) {
        const r = await this.appService.detecImage(dto);
        return this.send(r);
    }


    //OCR giấy tờ tùy thân
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'id_image', maxCount: 1 },
    ], {
        storage: diskStorage({
            destination: (req, file, cb) => {
                const path = `./uploads/`
                fs.mkdirSync(path, { recursive: true })
                return cb(null, path)
            },
            filename: (req, file, cb) => {
                const filename = moment(new Date()).format('DDMMYYYYhhmmss') + "_" + crypto.randomBytes(5).toString('hex') + "_" + file.originalname;
                cb(null, filename)
            }
        }),
        fileFilter: (req: any, file: any, cb: any) => {
            if (/(png|jpeg|jpg)/i.test(file.mimetype)) {
                // Allow storage of file
                cb(null, true);
            } else {
                req.fileValidationError = "Định dạng file không đúng";
                // Reject file
                cb(null, false);
            }
        },
    }))
    @Post("idr")
    @ApiCreatedResponse({
        description: 'Success',
        type: OcrIDModel
    })
    async idRecognition(@Req() req, @Body() dto: IDRecognitionDto, @UploadedFiles() files) {
        if (req.fileValidationError) {
            throw new HttpException(`${req.fileValidationError}`, HttpStatus.BAD_REQUEST)
        }
        if (!files.id_image) {
            throw new HttpException(`File không được để trống`, HttpStatus.BAD_REQUEST)
        }
        const r = await this.appService.idRecognition(dto, files);
        return this.send(r);
    }

    //OCR faceID
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'id_image', maxCount: 1 },
        { name: 'face_image', maxCount: 1 },
        { name: "other_face_images", maxCount: 3 }
    ], {
        storage: diskStorage({
            destination: (req, file, cb) => {
                const path = `./uploads/`
                fs.mkdirSync(path, { recursive: true })
                return cb(null, path)
            },
            filename: (req, file, cb) => {
                const filename = moment(new Date()).format('DDMMYYYYhhmmss') + "_" + crypto.randomBytes(5).toString('hex') + "_" + file.originalname;
                cb(null, filename)
            }
        }),
        fileFilter: (req: any, file: any, cb: any) => {
            if (/(png|jpeg|jpg)/i.test(file.mimetype)) {
                // Allow storage of file
                cb(null, true);
            } else {
                req.fileValidationError = "Định dạng file không đúng";
                // Reject file
                cb(null, false);
            }
        },
    }))
    @Post("face-idr")
    @ApiCreatedResponse({
        description: 'Success',
        type: OcrFaceIDModel
    })
    async faceIdRecognition(@Req() req, @Body() dto: FaceIDRecognitionDto, @UploadedFiles() files) {
        if (req.fileValidationError) {
            throw new HttpException(`${req.fileValidationError}`, HttpStatus.BAD_REQUEST)
        }

        if (!files.id_image || !files.face_image) {
            throw new HttpException(`File không được để trống`, HttpStatus.BAD_REQUEST)
        }

        console.log(files);
        const r = await this.appService.faceIdRecognition(dto, files);
        return this.send(r);
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
