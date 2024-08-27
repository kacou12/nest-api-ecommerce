import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: 'postgres',
      username: 'postgres',
      password: 'azertyuiop',
      host: 'localhost',
      port: 5432,
      autoLoadEntities: true,
    }),
  ],
  exports: [],
})
export class DatabaseModule {}
