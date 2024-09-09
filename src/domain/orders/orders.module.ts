import { Product } from '@/domain/products/entities/product.entity';
import { Order } from '@/domain/orders/entities/order.entity';
import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderToProduct } from './entities/order-to-product.entity';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [TypeOrmModule.forFeature([Order, OrderToProduct, Product])],
})
export class OrdersModule {}
