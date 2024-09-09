import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IdDto } from 'src/common/dto/id.dto';
import { PaginateDto } from '@/common/dto/paginate.dto';
import { RemoveDto } from '@/common/dto/remove.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(@Query() paginateDto?: PaginateDto) {
    return this.usersService.findAll(paginateDto);
  }

  @Get(':id')
  findOne(@Param() { id }: IdDto) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param() { id }: IdDto, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Patch(':id/recover')
  recover(@Param() { id }: IdDto) {
    return this.usersService.recover(id);
  }

  @Delete(':id')
  remove(@Param() { id }: IdDto, @Query() { soft }: RemoveDto) {
    return this.usersService.remove(id, soft);
  }
}
