import {
  BaseEntity,
  CreateDateColumn,
  DataSource,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { getOrder, Order } from './decorators/order.decorator';

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

  static useDataSource(dataSource: DataSource) {
    BaseEntity.useDataSource.call(this, dataSource);
    const meta = dataSource.entityMetadatasMap.get(this);
    if (meta != null) {
      // reorder columns here
      meta.columns = [...meta.columns].sort((x, y) => {
        const orderX = getOrder((x.target as any).prototype, x.propertyName);
        const orderY = getOrder((y.target as any).prototype, y.propertyName);
        return orderX - orderY;
      });
    }
  }
}
