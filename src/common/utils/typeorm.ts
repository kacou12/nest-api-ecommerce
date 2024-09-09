import { DataSource } from 'typeorm';
import { join } from 'path';

export const PostgresDataSource = new DataSource({
  type: 'postgres',
  database: 'nestdb',
  // database: 'postgres',
  username: 'postgres',
  password: 'azertyuiop',
  host: 'localhost',
  port: 54320,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
});
