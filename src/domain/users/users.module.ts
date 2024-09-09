import { AuthModule } from '@/auth/auth.module';
import { IsUniqueValidator } from '@/common/validators/is-unique.validator';
import { User } from '@/domain/users/entities/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, IsUniqueValidator],
  imports: [TypeOrmModule.forFeature([User]), AuthModule],
})
export class UsersModule {}
