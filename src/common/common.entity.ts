import {
  BaseEntity,
  CreateDateColumn,
  DataSource,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { getOrder, Order } from './decorators/transformers/order.decorator';
import { Exclude } from 'class-transformer';

export abstract class CommonEntity extends BaseEntity {
  @Order(-1)
  @PrimaryGeneratedColumn()
  id: number;

  @Order(9999)
  @CreateDateColumn()
  created_at: Date;

  @Order(9999)
  @UpdateDateColumn()
  updated_at?: Date;

  @Order(9999)
  @Exclude()
  @DeleteDateColumn()
  deleted_at?: Date;

  static useDataSource(dataSource: DataSource) {
    BaseEntity.useDataSource.call(this, dataSource);
    const meta = dataSource.entityMetadatasMap.get(this);
    if (meta != null) {
      // reorder columns here

      try {
        meta.columns = [...meta.columns].sort((x, y) => {
          const orderX = getOrder((x.target as any).prototype, x.propertyName);
          const orderY = getOrder((y.target as any).prototype, y.propertyName);
          return orderX - orderY;
        });
      } catch (error) {
        return 1;
      }
    }
  }
}
