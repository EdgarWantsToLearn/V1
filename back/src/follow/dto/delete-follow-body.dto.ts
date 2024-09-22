import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class DeleteFollowBodyDto {
  @Type(() => Number)
  @IsNumber()
  following: number;
}
