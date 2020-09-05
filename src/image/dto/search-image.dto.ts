import { IsOptional } from 'class-validator';

export class SearchImageDto {
  @IsOptional()
  page: number;

  @IsOptional()
  take: number;
}
