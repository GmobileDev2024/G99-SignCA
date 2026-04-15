import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsOptional } from "class-validator";

export class IDRecognitionDto {
    @ApiProperty({ description: "Hình ảnh giấy tờ tùy thân" })
    id_image: string;

    @IsOptional()
    @IsIn(["5"])
    @ApiProperty({ description: "Loại giấy tờ: 5=Căn cước" })
    id_type: string

    @IsOptional()
    @ApiProperty({ description: "Task_id đang thực hiện, dùng để tạo requestid duy nhất cho việc ocr bên 247" })
    task_id: string
}

export class FaceIDRecognitionDto {
    @ApiProperty({ description: "Hình ảnh giấy tờ tùy thân" })
    id_image: any

    @ApiProperty({ description: "Hình ảnh khuôn mặt" })
    face_image: any

    @ApiProperty({
        required: false,
        description: "Hình ảnh khuôn mặt"
    })
    other_face_images: string[]
    
    @IsOptional()
    @ApiProperty({ description: "Task_id đang thực hiện, dùng để tạo requestid duy nhất cho việc ocr bên 247" })
    task_id: string
}