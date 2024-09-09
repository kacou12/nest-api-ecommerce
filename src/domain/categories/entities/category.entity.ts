import { CommonEntity } from '@/common/common.entity';
import { Product } from '@/domain/products/entities/product.entity';
import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';

@Entity()
export class Category extends CommonEntity {
  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Product, (product) => product.categories)
  products: Product[];
}
