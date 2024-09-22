import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdatePaintByIdBodyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description: string;
}
