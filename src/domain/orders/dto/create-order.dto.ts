import { ArrayNotEmpty, ValidateNested } from 'class-validator';
import { CreateOrderToProductDto } from './order-to-product.entity';
import { Type } from 'class-transformer';
import { IdDto } from '@/common/dto/id.dto';
import { IsEntity } from '@/common/decorators/validators/is-entity.decorator';

export class CreateOrderDto {
  @IsEntity()
  user: IdDto;
  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => CreateOrderToProductDto)
  orderToProducts: CreateOrderToProductDto[];
}
