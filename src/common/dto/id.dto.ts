import { IsInt, IsPositive, IsString } from 'class-validator';

export class IdDto {
  @IsPositive()
  @IsInt()
  id: number;
}
