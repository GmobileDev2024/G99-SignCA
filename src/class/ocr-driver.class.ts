import { IOcrFaceID, IOcrID } from "./../interfaces";
import { OcrDriverType } from "./../shared/constant";

export abstract class OcrDriver {
  abstract type: OcrDriverType;
  /**
   * OCR file chưa xác định mặt trước hay mặt sau
   * @param file 
   */
  abstract ocrID(file1: string, file2: string,task_id: string, id_type: number): Promise<IOcrID>;

  /**
   * OCR FaceID
   */
  abstract ocrFaceID(imageID: string, faceImage: string, otherFaceImages: string[]): Promise<IOcrFaceID>

  /**
   * Format
   */
  abstract getOcrIDModel(data): IOcrID

  abstract getOcrFaceIDModel(data): IOcrFaceID

}