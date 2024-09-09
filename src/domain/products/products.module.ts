import { Product } from './entities/product.entity';
import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderToProduct } from '../orders/entities/order-to-product.entity';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [TypeOrmModule.forFeature([Product, OrderToProduct])],
})
export class ProductsModule {}
