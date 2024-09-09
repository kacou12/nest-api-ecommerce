import { Category } from './entities/category.entity';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginateDto } from '@/common/dto/paginate.dto';
import { DEFAULT_PAGE_SIZE } from '@/common/utils/common.constants';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}
  create(createCategoryDto: CreateCategoryDto) {
    const category = this.categoriesRepository.create(createCategoryDto);
    return this.categoriesRepository.save(category);
  }

  findAll(paginateDto?: PaginateDto) {
    return this.categoriesRepository.find({
      skip: paginateDto.offset,
      take: paginateDto.limit ?? DEFAULT_PAGE_SIZE.CATEGORY,
    });
  }

  async findOne(id: number) {
    const category = await this.categoriesRepository.findOne({
      where: {
        id,
      },
      relations: {
        products: true,
      },
    });
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoriesRepository.preload({
      id,
      ...updateCategoryDto,
    });
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return this.categoriesRepository.save(category);
  }

  async remove(id: number) {
    const category = await this.findOne(id);
    if (category.products.length) {
      throw new ConflictException(
        `Category with id ${id} has related products `,
      );
    }
    return this.categoriesRepository.remove(category);
  }
}
