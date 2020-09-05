import { PageMetaDto } from 'core/dto/page-meta.dto';
import { Expose } from 'class-transformer';

export class ImageRespDto {
  @Expose()
  originName: string;

  @Expose()
  mimetype: string;

  @Expose()
  size: number;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}

export class ImagePageRespDto {
  readonly data: ImageRespDto[];

  readonly meta: PageMetaDto;

  constructor(data: ImageRespDto[], meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
