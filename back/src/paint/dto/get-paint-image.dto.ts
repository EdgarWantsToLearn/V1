import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class GetPaintImageParamsDto {
  @Type(() => Number)
  @IsNumber()
  id: number;
}
