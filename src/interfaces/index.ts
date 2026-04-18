
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
export interface IUserCertificate {
  cert_id: string;
  serial_number: string;
  cert_status: string;
  cert_status_code: string;
  cert_valid_from: string;
  cert_valid_to: string;
  cert_data: string;
  chain_data?: {
    ca_cert?: string | null;
    root_cert?: string | null;
  } | null;
  service_type?: string;
  service_name?: string;
  service_pricingcode?: string;
  cert_subject?: string;
  device?: any;
  name?: string | null;
}

export interface ICertificateInfo {
  status_code: number;
  message: string;
  transaction_id: string | null;
  certificates: IUserCertificate[];
}

export interface ISignFileItem {
  data_to_be_signed: string;
  doc_id: string;
  file_type: string;
  sign_type: string;
}

export interface ISignResponse {
  status_code: number;
  message: string;
  transaction_id: string | null;
  tran_code?: string | null;
  expired_in?: number | null;
}

export interface ITransactionSignature {
  doc_id: string;
  signature_value: string;
  timestamp_signature?: string | null;
}

export interface ITransactionStatus {
  status_code: number;
  message: string;
  transaction_id: string | null;
  signatures: ITransactionSignature[];
}