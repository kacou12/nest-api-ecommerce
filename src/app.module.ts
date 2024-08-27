import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, CommonModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
