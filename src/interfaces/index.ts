
export type IAddressEntity = {
    province_code?: number | 'N/A'
    province?: string | 'N/A'
    district_code?: number | 'N/A'
    district?: string | 'N/A'
    ward_code?: number | 'N/A'
    ward?: string | 'N/A'
    street?: string | 'N/A'
}
export interface IFrontSide {
    id: string
    id_prob: string
    name: string
    name_prob: string
    dob: string
    dob_prob: string
    sex?: string,
    sex_prob?: string,
    nationality?: string,
    nationality_prob?: string,
    home: string
    home_prob: string
    address: string
    address_prob: string
    address_entities: IAddressEntity
    doe?: string,
    doe_prob?: string,
    type: string
}

export interface IBackSide {
    religion_prob: string,
    religion: string,
    ethnicity_prob: string,
    ethnicity: string,
    features: string,
    features_prob: string,
    issue_date: string,
    issue_date_prob: string,
    issue_loc_prob: string,
    issue_loc: string,
    type: string
}
type TYPE_ID = 'CCCD' | 'CMND' | 'CCCD_CHIP' | 'PASSPORT' | 'CC';
type SEX_ENUM = "MALE" | 'FEMALE' | 'N/A'
export type IOcrID = {
    //Số CCCD/CMND/PASSPORT
    id: string
    //Độ chính xác
    id_prob: number | "N/A"
    //Tên Theo giấy tờ
    name: string
    //Độ chính xác
    name_prob: number | "N/A"
    //dob: Ngày sinh
    dob: string
    //dob_prob: Độ chính xác
    dob_prob: number | "N/A"
    //sex: Giới tính
    sex?: SEX_ENUM
    //sex_prob: Độ chính xác
    sex_prob?: number | "N/A"
    //Quốc gia
    nationality?: string
    nationality_prob: number | "N/A"
    //home: Quê quán
    home: string
    home_prob: number | "N/A"
    home_entities: IAddressEntity
    //address: Địa chỉ thường trú
    address: string
    address_prob: number
    address_entities: IAddressEntity
    //doe: Ngày hết hạn
    doe?: string
    doe_prob?: string
    //back
    religion_prob: number | "N/A"
    religion: string | "N/A"
    ethnicity_prob: number | "N/A"
    ethnicity: string | "N/A"
    features: string | "N/A"
    features_prob: number | "N/A"
    issue_date: string | "N/A"
    issue_date_prob: number | "N/A"
    issue_loc_prob: number | "N/A"
    issue_loc: string | "N/A"
    type: TYPE_ID
    request_id: string;
}

export type IOcrFaceID = {
    fake_score: number;
    similarity: number
    message: string
    request_id: string;
}