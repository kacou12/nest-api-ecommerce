import { IdDto } from '@/common/dto/id.dto';
import { ArrayNotEmpty, IsEmail, IsNumber, IsString } from 'class-validator';
import { Product } from '../entities/product.entity';
import { IsEntity } from '../../../common/decorators/validators/is-entity.decorator';
import { IsUnique } from '@/common/decorators/validators/is-unique.decorator';

export class CreateProductDto {
  @IsString()
  @IsUnique(Product, 'name')
  readonly name: string;

  @IsString()
  readonly description: string;

  @IsNumber()
  readonly price: number;

  @ArrayNotEmpty()
  @IsEntity()
  readonly categories: IdDto[];
}
