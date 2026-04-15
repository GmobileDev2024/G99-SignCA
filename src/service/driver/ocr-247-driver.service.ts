import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { OcrDriver } from "../../class/ocr-driver.class";
import { OcrDriverType } from "./../../shared/constant";
import { IDRecognitionDto } from "./../../dto/id-recognition.dto";
import { IOcrFaceID, IOcrID } from "./../../interfaces";
import { OcrIDModel } from "src/models/ocr.class";
import { OcrFaceIDModel } from "src/models/ocr-face-id.class";
import { Ocr247Service } from "@app/ocr-247";
import { ApiRes } from "src/shared";

@Injectable()
export class Ocr247DriverService extends OcrDriver {
    type: OcrDriverType = OcrDriverType.IZOTA;

    constructor(
        private ocr247Service: Ocr247Service
    ) {
        super();
    }

    async ocrID(file: string, file2: string, task_id: string, id_type?: number): Promise<IOcrID> {
        let r = await this.ocr247Service.idRecognition(file, task_id, id_type)
        if (r.status)
            return this.getOcrIDModel(r.data);
        return null
    }

    getOcrIDModel(data): IOcrID {
        console.log('data :>> ', data);
        const arrayAddress = data.address ? data.address.split(',') : [];
        const arrayHomeAddress = data.homeTown ? data.homeTown.split(',') : [];
        let _ocrID: IOcrID = {
            request_id: data.request_id,
            id: data.id || "N/A",
            id_prob: this.ocr247Service.safeParseFirst(data.idconf),
            name: data.name || "N/A",
            name_prob: this.ocr247Service.safeParseFirst(data.nameconf),
            dob: data.birthday || "N/A",
            dob_prob: this.ocr247Service.safeParseFirst(data.birthdayConf),
            sex: data.sex?.toLowerCase() === "nam" ? "MALE" : data.sex?.toLowerCase() === "nữ" ? "FEMALE" : "N/A",
            sex_prob: this.ocr247Service.safeParseFirst(data.sexconf),
            nationality: data.type === "PASSPORT" ? data.country : "Việt Nam",
            nationality_prob: "N/A",
            home: data.hometown ? data.hometown : "N/A",
            home_prob: this.ocr247Service.safeParseFirst(data.hometownconf),
            home_entities: {
                province_code: data.cityCode || "N/A",
                province: data.city || "N/A",
                district_code: data.districtCode || "N/A",
                district: data.district || "N/A",
                ward_code: data.wardCode || "N/A",
                ward: data.ward || "N/A",
                street: arrayAddress.length > 2 ? arrayAddress[0] : "N/A"
            },
            address: data.address || "N/A",
            address_prob: data.addressConf ? data.addressConf[0] : "N/A",
            address_entities: {
                province_code: data.cityCode || "N/A",
                province: data.city || "N/A",
                district_code: data.districtCode || "N/A",
                district: data.district || "N/A",
                ward_code: data.wardCode || "N/A",
                ward: data.ward || "N/A",
                street: arrayAddress.length > 2 ? arrayAddress[0] : "N/A"
            },
            doe: !data.expiry || data.expiry === 'Không thời hạn' ? 'N/A' : data.expiry,
            //back
            religion_prob: "N/A",
            religion: "N/A",
            ethnicity_prob: "N/A",
            ethnicity: "N/A",
            features: data.characteristics || "N/A",
            features_prob: data.characteristics_conf ? data.characteristics_conf[0] : "N/A",
            issue_date: data.issue_date || "N/A",
            issue_date_prob: this.ocr247Service.safeParseFirst(data.birthdayconf),
            issue_loc_prob: this.ocr247Service.safeParseFirst(data.issue_by_conf),
            // issue_loc: data.issue_by || "N/A",
            issue_loc: data.type === 'CC' ? 'Bộ Công An' : (data.issue_by || 'N/A'),
            type: data.type == "NA" ? "N/A" : data.type
        }

        let model = new OcrIDModel(_ocrID);
        return model;
    }

    async ocrFaceID(imageID: string, faceImage: string, otherFaceImages: string[]): Promise<IOcrFaceID> {
        let data = await this.ocr247Service.faceVerification(imageID, faceImage, otherFaceImages);
        return this.getOcrFaceIDModel(data);
    }

    getOcrFaceIDModel(data): IOcrFaceID {
        console.log('getOcrFaceIDModel >>> ', data);
        let _ocrFaceID: IOcrFaceID = {
            fake_score: data.face_anti_spoof_status.fake_score,
            similarity: data.sim,
            message: data.verify_result_text || "N/A",
            request_id: data.request_id || "N/A",
        }
        return new OcrFaceIDModel(_ocrFaceID)
    }
}