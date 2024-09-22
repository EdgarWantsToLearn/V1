import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class GetFollowersByUserIdDtoParams {
  @Type(() => Number)
  @IsNumber()
  userId: number;
}
