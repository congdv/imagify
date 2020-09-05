import { PageOptionsDto } from './page-options.dto';

export class PageMetaDto {
  readonly page: number;

  readonly take: number;

  readonly itemCount: number;

  readonly pageCount: number;

  constructor(pageOptionsDto: PageOptionsDto, itemCount: number) {
    console.log('PageMetaDto -> constructor -> itemCount', itemCount);
    console.log('PageMetaDto -> constructor -> pageOptionsDto', pageOptionsDto);
    this.page = pageOptionsDto.page;
    this.take = pageOptionsDto.take;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(itemCount / this.take);
  }
}
