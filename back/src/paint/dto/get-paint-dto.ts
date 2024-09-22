import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class GetPaintsQueryDto {
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  id: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  userId: number;
}
