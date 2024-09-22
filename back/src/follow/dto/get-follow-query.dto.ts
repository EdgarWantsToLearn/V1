import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class GetFollowsQueryDto {
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  id: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  follower: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  following: number;
}
