import { IsInt, IsOptional, IsPositive } from 'class-validator';

export class PaginateDto {
  @IsOptional()
  @IsPositive()
  @IsInt()
  readonly offset: number;

  @IsOptional()
  @IsPositive()
  @IsInt()
  readonly limit: number;
}
