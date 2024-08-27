import { CommonEntity } from 'src/common/common.entity';
import { RegistryDates } from './../../common/embedded/registry-dates.embedded';
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
export class User extends CommonEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phone: string;

  @Column()
  password: string;

  // @Column(() => RegistryDates, { prefix: false })
  // registryDates: RegistryDates;
}
