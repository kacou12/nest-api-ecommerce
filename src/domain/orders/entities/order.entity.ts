import { OrderStatuseEnum } from './../enums/order-status.enum';
import { CommonEntity } from '@/common/common.entity';
import { Payment } from '@/domain/payments/entities/payment.entity';
import { User } from '@/domain/users/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { OrderToProduct } from './order-to-product.entity';

@Entity()
export class Order extends CommonEntity {
  @Column({
    type: 'enum',
    enum: OrderStatuseEnum,
    default: OrderStatuseEnum.AWAIT_PAYMENT,
  })
  status: OrderStatuseEnum;

  @ManyToOne(() => User, (user) => user.orders, { nullable: false })
  user: User;

  @OneToOne(() => Payment, (payment) => payment.order, { cascade: true })
  payment: Payment;

  @OneToMany(() => OrderToProduct, (orderToProduct) => orderToProduct.order, {
    cascade: true,
  })
  orderToProducts: OrderToProduct[];
}
