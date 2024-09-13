import { DataSource } from 'typeorm';

export const PostgresDataSource = new DataSource({
  type: 'postgres',
  database: 'nestdb',
  username: 'postgres',
  password: 'azertyuiop',
  host: 'localhost',
  port: 54320,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
});
