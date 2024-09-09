import { CommonEntity } from '@/common/common.entity';
import { Category } from '@/domain/categories/entities/category.entity';
import { OrderToProduct } from '@/domain/orders/entities/order-to-product.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';

@Entity()
export class Product extends CommonEntity {
  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @ManyToMany(() => Category, (category) => category.products, {
    nullable: false,
  })
  @JoinTable({ name: 'product_to_category' })
  categories: Category[];

  @OneToMany(() => OrderToProduct, (orderToProduct) => orderToProduct.product)
  orderToProducts: OrderToProduct[];

  get orders() {
    return this.orderToProducts.map((orderToProduct) => orderToProduct.order);
  }
}
