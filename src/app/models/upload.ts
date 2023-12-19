export class FileUploadModel {
    id?: number;
    userName?: string;
    moduleId?: number;
    fileName?: string;
    hashCd?: string;
    message?: string;
    awsS3FileUrl?: string;
    status?: string;
    createdDate?: Date;
}
export class UploadFileRequest {
    moduleId?: number;
    fileName?: string;
    blob?: string;
    message?: string;
    fileType?: string;
}
