import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class UpdatePaintByIdParams {
  @Type(() => Number)
  @IsNumber()
  id: number;
}
