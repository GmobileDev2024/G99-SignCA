import { ApiProperty } from "@nestjs/swagger";
import { IAddressEntity, IOcrFaceID, IOcrID } from "src/interfaces";

export class OcrFaceIDModel implements IOcrFaceID {
    @ApiProperty()
    similarity: number

    fake_score: number;
    
    @ApiProperty()
    message: string

    request_id: string;

    constructor(partial: Partial<IOcrFaceID> = {}) {
        for (const key in partial) {
            this[key] = partial[key];
        }
    }
}