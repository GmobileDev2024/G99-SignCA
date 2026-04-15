import { ApiProperty } from "@nestjs/swagger";
import { IAddressEntity, IOcrID } from "src/interfaces";

export class OcrIDModel implements IOcrID {
    @ApiProperty()
    id: string
    @ApiProperty()
    id_prob: number
    @ApiProperty()
    name: string
    @ApiProperty()
    name_prob: number
    @ApiProperty()
    dob: string
    @ApiProperty()
    dob_prob: number
    @ApiProperty()
    sex: "MALE" | 'FEMALE' | 'N/A'
    @ApiProperty()
    sex_prob: number | "N/A"
    @ApiProperty()
    nationality: string | "N/A"
    @ApiProperty()
    nationality_prob: number | 'N/A'
    @ApiProperty()
    home: string
    @ApiProperty()
    home_prob: number
    @ApiProperty()
    home_entities: IAddressEntity
    @ApiProperty()
    address: string
    @ApiProperty()
    address_prob: number
    @ApiProperty()
    address_entities: IAddressEntity
    @ApiProperty()
    doe: string
    //back
    @ApiProperty({ default: "N/A" })
    religion_prob: number | "N/A"
    @ApiProperty()
    religion: string | "N/A"
    @ApiProperty()
    ethnicity_prob: number | "N/A"
    @ApiProperty()
    ethnicity: string | "N/A"
    @ApiProperty({ default: "N/A" })
    features: string | "N/A"
    @ApiProperty()
    features_prob: number | "N/A"
    @ApiProperty()
    issue_date: string | "N/A"
    @ApiProperty()
    issue_date_prob: number | "N/A"
    @ApiProperty()
    issue_loc_prob: number | "N/A"
    @ApiProperty()
    issue_loc: string | "N/A"
    @ApiProperty()
    type: 'CCCD' | 'CMND' | 'CCCD_CHIP' | 'PASSPORT'
    request_id: string;
    constructor(partial: Partial<IOcrID> = {}) {
        for (const key in partial) {
            this[key] = partial[key];
        }
    }
}