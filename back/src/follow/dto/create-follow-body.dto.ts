import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class CreateFollowBodyDto {
  @Type(() => Number)
  @IsNumber()
  following: number;
}
