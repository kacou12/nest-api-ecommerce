import { hash } from 'bcrypt';
import { User } from '@/domain/users/entities/user.entity';
import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginateDto } from '@/common/dto/paginate.dto';
import { DEFAULT_PAGE_SIZE } from '@/common/utils/common.constants';
import { HashingService } from '@/auth/hashing/hashing.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly hashingService: HashingService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  findAll(paginateDto?: PaginateDto) {
    return this.usersRepository.find({
      skip: paginateDto.offset,
      take: paginateDto.limit ?? DEFAULT_PAGE_SIZE.USER,
    });
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
      relations: {
        orders: {
          payment: true,
          orderToProducts: {
            product: true,
          },
        },
      },
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.preload({ id, ...updateUserDto });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return this.usersRepository.save(user);
  }

  async remove(id: number, soft: boolean) {
    const user = await this.findOne(id);

    return soft
      ? this.usersRepository.softRemove(user)
      : this.usersRepository.remove(user);
  }

  async recover(id: number) {
    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
      withDeleted: true,
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    if (!user.deleted_at) {
      throw new ConflictException(`User with id ${id} not deleted`);
    }
    return this.usersRepository.recover(user);
  }
}
