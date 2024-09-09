import { Product } from './entities/product.entity';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginateDto } from '@/common/dto/paginate.dto';
import { DEFAULT_PAGE_SIZE } from '@/common/utils/common.constants';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}
  create(createProductDto: CreateProductDto) {
    const product = this.productsRepository.create(createProductDto);
    return this.productsRepository.save(product);
  }

  findAll(paginateDto?: PaginateDto) {
    return this.productsRepository.find({
      skip: paginateDto.offset,
      take: paginateDto.limit ?? DEFAULT_PAGE_SIZE.PRODUCT,
    });
  }

  async findOne(id: number) {
    const product = await this.productsRepository.findOne({
      where: { id },
      relations: {
        categories: true,
      },
    });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productsRepository.preload({
      id,
      ...updateProductDto,
    });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return this.productsRepository.save(product);
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    return this.productsRepository.remove(product);
  }

  async recover(id: number) {
    const product = await this.productsRepository.findOne({
      where: {
        id,
      },
      withDeleted: true,
    });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    if (!product.deleted_at) {
      throw new ConflictException(`Product with id ${id} not deleted`);
    }
    return this.productsRepository.recover(product);
  }
}
