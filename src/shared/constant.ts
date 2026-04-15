export enum ApiStatus {
    SUCCESS = 1,
    FAIL = 0
}

export enum OcrDriverType {
    FTP_AI = "FTPAI",
    IZOTA = "IZOTA",
    GOOGLE = "GOOGLE",
    OCR_247 = "OCR_247"
}

export const mapDocumentToType = {
    "CCCD": "CCCD",
    "NEW ID": "CMND",
    "OLD ID": "CMND",
    "PASSPORT": "PASSPORT",
    "PASSPOST": "PASSPORT",
    "CHIP ID": "CCCD_CHIP",
    "DRIVER LICENSE OLD": "GTB",
    "DRIVER LICENSE PET": "GTB",
    "POLICE ID": "NA",
    "ARMY ID": "NA",
};