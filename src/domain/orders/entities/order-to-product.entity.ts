import { CommonEntity } from '@/common/common.entity';
import { Category } from '@/domain/categories/entities/category.entity';
import { Product } from '@/domain/products/entities/product.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class OrderToProduct extends CommonEntity {
  @PrimaryColumn()
  orderId: number;

  @PrimaryColumn()
  productId: number;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Product, (product) => product.orderToProducts)
  product: Product;

  @ManyToOne(() => Order, (order) => order.orderToProducts, {
    onDelete: 'CASCADE',
  })
  order: Order;
}
