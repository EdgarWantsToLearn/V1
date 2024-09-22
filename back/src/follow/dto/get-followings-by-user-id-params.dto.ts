import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class GetFollowingsByUserIdDtoParams {
  @Type(() => Number)
  @IsNumber()
  userId: number;
}
