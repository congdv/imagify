import { Expose } from 'class-transformer';

export class CreateUserRespDto {
  @Expose()
  authToken: string;
}
