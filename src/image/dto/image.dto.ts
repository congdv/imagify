import { IsOptional } from 'class-validator';

export class Image {
  @IsOptional()
  fieldName: string;

  @IsOptional()
  originalname: string;

  @IsOptional()
  encoding: string;

  @IsOptional()
  mimetype: string;

  @IsOptional()
  destination: string;

  @IsOptional()
  filename: string;

  @IsOptional()
  path: string;

  @IsOptional()
  size: number;
}
