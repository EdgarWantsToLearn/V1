import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateUserbodyDto {
  @IsOptional()
  @IsInt()
  id: number;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName: string;
}
