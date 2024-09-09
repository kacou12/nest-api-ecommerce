import { Order } from '@/domain/orders/entities/order.entity';
import { CommonEntity } from 'src/common/common.entity';
import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Exclude, Expose } from 'class-transformer';
import { Hash } from '@/common/utils/hash';

@Entity()
export class User extends CommonEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phone: string;

  @Column()
  @Exclude()
  password: string;

  @OneToMany(() => Order, (order) => order.user, {
    cascade: ['soft-remove', 'recover'],
  })
  orders: Order[];

  @Exclude()
  isDelete() {
    return !!this.deleted_at;
  }
}
