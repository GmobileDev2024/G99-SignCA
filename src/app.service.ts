import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DetectImageDto } from './dto/detect-image-dto';
import { FaceIDRecognitionDto, IDRecognitionDto } from './dto/id-recognition.dto';
// import { FptAiService } from '@app/fpt-ai';
import { join } from 'path';
import { OcrDriver } from './class/ocr-driver.class';
import { OcrDriverType } from './shared/constant';
import { OcrService } from './service/ocr.service';
import { GetCertificateDto } from './dto/get-certificate.dto';
import { SignRequestDto } from './dto/sign.dto';
import { CaService } from './service/ca.service';
var fs = require('fs')
@Injectable()
export class AppService {
  constructor(
    // private readonly fptaiService: FptAiService,
    private readonly ocrService: OcrService,
    private readonly caService: CaService,
  ) {

  }

  async detecImage(dto: DetectImageDto) {
    const r = this.detectImageUseGoogleVision(dto);
    console.log(r);
    return r;
  }


  async faceIdRecognition(dto: FaceIDRecognitionDto, files) {
    let deleteFiles = []
    const idImage = join(process.cwd(), files.id_image[0].path)
    const faceImage = join(process.cwd(), files.face_image[0].path)
    deleteFiles = [idImage, faceImage]
    let otherFaceImages = []
    for (const img of files.other_face_images || []) {
      otherFaceImages.push(join(process.cwd(), img.path))
      deleteFiles.push(join(process.cwd(), img.path))
    }
    const res = await this.ocrService.ocrFaceID(idImage, faceImage, otherFaceImages);
    for (const obj of deleteFiles) {
      if (fs.existsSync(obj))
        fs.unlinkSync(obj);
    }

    //check độ nhận diện
    console.log(res);
    // if(res.similarity < parseFloat(process.env.VERIFY_FACEID_RATIO || '0.9')) {
    //   throw new HttpException(`Ảnh khuôn mặt không trùng khớp`, HttpStatus.BAD_GATEWAY);
    // }

    return res;
  }

  async idRecognition(dto: IDRecognitionDto, files) {
    let fFile = files.id_image[0]
    let afile = join(process.cwd(), fFile.path)

    const task_id = dto.task_id
    const idType = dto.id_type ? parseInt(dto.id_type as unknown as string, 10) : null; // convert id_type thành số trước khi gọi hàm OCR
    const res = await this.ocrService.ocrID(afile, null, task_id, idType);
    if (fs.existsSync(afile))
      fs.unlinkSync(afile);
    return res;
  }

  private async detectImageUseGoogleVision(dto: DetectImageDto) {
    const vision = require('@google-cloud/vision');

    // Creates a client
    const client = new vision.ImageAnnotatorClient();
    const request = {
      image: {
        content: Buffer.from(dto.fileBase64, 'base64')
      }
    };
    const [result] = await client.textDetection(request);
    const detections = result.textAnnotations;
    let textSerial

    if (dto.object_detect == 'SIM_SERIAL') {
      const listText = detections.map(item => { return item.description });
      detections.forEach(text => {
        if (listText.includes("vietnamobile") || listText.includes("0995") || listText.includes("0993666199")) {
          if (text.description.length == 20 && !/\s/g.test(text.description.length) && /^\d+$/.test(text.description)) {
            textSerial = text.description;
          }
        } else {
          if (text.description.length > 15 && text.description.length < 21 && !/\s/g.test(text.description.length) && /^\d+$/.test(text.description)) {
            textSerial = text.description;
          }
        }

      });
    }

    return textSerial;
  }

  async getCertificate(dto: GetCertificateDto) {
    return this.caService.getCertificate(
      dto.user_id,
      dto.transaction_id,
      dto.serial_number,
    );
  }

  async sign(dto: SignRequestDto) {
    return this.caService.sign(dto);
  }

  async getSignStatus(transactionId: string) {
    return this.caService.getTransactionStatus(transactionId);
  }




}
