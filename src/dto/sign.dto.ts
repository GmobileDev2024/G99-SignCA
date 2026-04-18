import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class SignFileItemDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  data_to_be_signed: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  doc_id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  file_type: string;

  @ApiProperty({ example: 'hash' })
  @IsString()
  @IsNotEmpty()
  sign_type: string;
}

export class SignRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  user_id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  transaction_id: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  transaction_desc?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  serial_number?: string;

  @ApiProperty({ required: false, description: 'YYYYMMddHHmmss' })
  @IsOptional()
  @IsString()
  time_stamp?: string;

  @ApiProperty({ type: [SignFileItemDto] })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => SignFileItemDto)
  sign_files: SignFileItemDto[];
}