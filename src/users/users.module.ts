import { User } from '@/users/entities/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { IsUniqueValidator } from '@/common/validators/is-unique.validator';

@Module({
  controllers: [UsersController],
  providers: [UsersService, IsUniqueValidator],
  imports: [TypeOrmModule.forFeature([User])],
})
export class UsersModule {}
