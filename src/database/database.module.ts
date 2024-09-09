import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: 'nestdb',
      // database: 'postgres',
      username: 'postgres',
      password: 'azertyuiop',
      host: 'localhost',
      port: 54320,
      autoLoadEntities: true,
    }),
  ],
  exports: [],
})
export class DatabaseModule {}
