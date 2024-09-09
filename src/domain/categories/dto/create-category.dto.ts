import { IsString } from 'class-validator';
import { Category } from '../entities/category.entity';
import { IsUnique } from '@/common/decorators/validators/is-unique.decorator';

export class CreateCategoryDto {
  @IsString()
  @IsUnique(Category, 'name')
  readonly name: string;
}
