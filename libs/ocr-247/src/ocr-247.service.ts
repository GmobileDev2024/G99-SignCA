import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ApiResModel } from 'src/shared/common.interface';
import { ApiStatus, mapDocumentToType } from 'src/shared/constant';

const FormData = require('form-data');
const fs = require('fs');

@Injectable()
export class Ocr247Service {
  headers = {};
  serviceUrl = "";

  constructor(
    readonly httpService: HttpService
  ) {
    this.serviceUrl = process.env.OCR_247 || "https://api-ekyc.hethong247.com"
    this.headers = {
      "key": process.env.KEY_247 || "jSlOJzZX1YTAPixNpHPzAZT4EwRRdC4z",
    }
  }

  async idRecognition(fullPathFile: string, task_id: string, id_type: number) {
    let ress = new ApiResModel()
    console.log(`${Ocr247Service.name} START OCR 247 Start taskID:${task_id} ${id_type}`);
    const headers = {
      key: process.env.KEY_247 || 'jSlOJzZX1YTAPixNpHPzAZT4EwRRdC4z',
      'Content-Type': 'application/json',
    };

    const requestId = `GM_${task_id}_${process.env.REQUEST_ID_TEXT}`;

    // Đọc file và convert sang base64
    const imageBase64 = fs.readFileSync(fullPathFile, { encoding: 'base64' });

    const body = {
      image: imageBase64,
      request_id: requestId,
      id_full_thr: 0.8,
      is_full_threshold: 0.8,
    };

    const config = {
      method: 'POST',
      url: id_type && id_type === 5 ? `${this.serviceUrl}/v2/ocr/recognition` : `${this.serviceUrl}/ocr/recognition`,
      headers: headers,
      data: body,
      timeout: 1000 * 40, // 40 seconds
    };
    try {
      const rOcr = await this.httpService.axiosRef(config);
      ress.data = rOcr?.data;
      ress.code = "SUCCESS"
      ress.message = "SUCCESS"
      ress.status = ApiStatus.SUCCESS
      // Convert địa chỉ sang giá trị của tổng tục thống kê
      const addressEntities = await this.convertAddressToTCTK(ress.data.address || '');
      //   gán lại vào data trước khi trả về
      Object.assign(ress.data, {
        cityCode: addressEntities.province,
        city: addressEntities.province_name,
        districtCode: addressEntities.district,
        district: addressEntities.district_name,
        wardCode: addressEntities.precinct,
        ward: addressEntities.precinct_name,
      });

      ress.data.type = ress.data.document?.toUpperCase().trim() === "CHIP ID" && ress.data.id_chip_type === "chip_type_2"
        ? "CC"
        : mapDocumentToType[ress.data.document?.toUpperCase().trim()] || "N/A";

      return ress
    } catch (error) {
      console.error(`${Ocr247Service.name} START OCR 247 taskID:${task_id} ${id_type} Error: `, error.message);

      ress.message = error.message
      ress.code = "FAIL"
    } finally {
      return ress;
    }
  }

  async faceVerification(documentImage: string, faceImage: string, faces: string[] = []) {
    const headers = {
      ...this.headers,
      'Content-Type': 'application/json'
    };
    const requestId = `GM${new Date().getTime()}_${this.randomString(10)}`;
    // Đọc file và convert sang base64
    const imageCardBase64 = fs.readFileSync(documentImage, { encoding: 'base64' });
    const imageLiveBase64 = fs.readFileSync(faceImage, { encoding: 'base64' });

    const body: any = { image_card: imageCardBase64, image_live: imageLiveBase64, request_id: requestId };
    console.log('body :>> ', body);
    if (faces.length >= 3) {
      body.image_live1 = fs.readFileSync(faces[0], { encoding: 'base64' });
      body.image_live2 = fs.readFileSync(faces[1], { encoding: 'base64' });
      body.image_live3 = fs.readFileSync(faces[2], { encoding: 'base64' });
    }

    const config = {
      method: 'POST',
      url: `${this.serviceUrl}/faceid/verification`,
      headers: headers,
      data: body,
    };

    try {
      const response = await this.httpService.axiosRef(config);
      return response.data;
    } catch (error) {
      console.error('Face check failed:', error.message);
      return null;
    }

  }

  randomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  async convertAddressToTCTK(address: string): Promise<{
    province: string,
    province_name: string,
    district: string,
    district_name: string,
    precinct: string,
    precinct_name: string,
    result_code: number
  }> {
    const headers = {
      key: process.env.KEY_247,
      'Content-Type': 'application/json',
    };

    const body = {
      address: address,
      code_type: 'tctk',
    };

    const config = {
      method: 'POST',
      url: `${this.serviceUrl}/ocr/address`,
      headers: headers,
      data: body,
    };

    try {
      const res = await this.httpService.axiosRef(config);
      return res.data;
    } catch (error) {
      console.error('Convert address failed:', error?.message || error);
      return null;
    }
  }

  safeParseFirst(confString: string): number | "N/A" {
    try {
      const parsed = JSON.parse(confString);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed[0] : "N/A";
    } catch {
      return "N/A";
    }
  }
}
