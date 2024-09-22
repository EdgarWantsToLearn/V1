import { IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateUserParamsDto {
  @Type(() => Number) // Transforme la chaîne en nombre
  @IsInt({ message: 'Le paramètre doit être un entier.' })
  id: number;
}
