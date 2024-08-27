import { DataSource } from 'typeorm';
import { join } from 'path';

export const PostgresDataSource = new DataSource({
  type: 'postgres',
  database: 'postgres',
  username: 'postgres',
  password: 'azertyuiop',
  host: 'localhost',
  port: 5432,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
});
