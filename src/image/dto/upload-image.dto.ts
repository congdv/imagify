import { IsNotEmpty } from 'class-validator';
import { Image } from './image.dto';

export class UploadImageDto {
  @IsNotEmpty()
  images: [Image];
}
