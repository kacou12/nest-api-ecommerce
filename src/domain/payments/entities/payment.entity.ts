import { CommonEntity } from '@/common/common.entity';
import { Order } from '@/domain/orders/entities/order.entity';
import { Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity()
export class Payment extends CommonEntity {
  @OneToOne(() => Order, (order) => order.payment, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  order: Order;
}
