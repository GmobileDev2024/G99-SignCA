import { Injectable } from "@nestjs/common";
import { OcrDriverType } from "src/shared/constant";
import { OcrDriver } from "src/class/ocr-driver.class";
import { IDRecognitionDto } from "src/dto/id-recognition.dto";
import {  Ocr247DriverService } from "./driver";
import { IOcrFaceID, IOcrID } from "./../interfaces";
import { OcrIDModel } from "src/models/ocr.class";
const fs = require('fs');

@Injectable()
export class OcrService {
    type: OcrDriverType = OcrDriverType.IZOTA;

    constructor(
        private ocri247Service: Ocr247DriverService
    ) {
    }


    async ocrID(file: string, file2: string = null, task_id: string, id_type?: number): Promise<IOcrID> {
        let res: IOcrID = await this.findDriver().ocrID(file, file2, task_id, id_type) as IOcrID;
        return res
    }
    async ocrFaceID(imageID: string, faceImage: string, otherFaceImages: string[]): Promise<IOcrFaceID> {
        // const driver = this.findDriver(OcrDriverType.OCR_247);
        console.log('this.findDriver() :>> ', this.findDriver());
        let res: IOcrFaceID = await this.findDriver().ocrFaceID(imageID, faceImage, otherFaceImages) as IOcrFaceID;
        return res
    }


    findDriver(type: string = null): OcrDriver {
        const selectedDriver = type || process.env.OCR_DRIVER;

        const driverMap: Record<string, OcrDriver> = {
         
            [OcrDriverType.OCR_247]: this.ocri247Service,
        };

        return driverMap[selectedDriver] || this.ocri247Service;
    }


}