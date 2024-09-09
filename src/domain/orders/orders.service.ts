import { Order } from '@/domain/orders/entities/order.entity';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginateDto } from '@/common/dto/paginate.dto';
import { DEFAULT_PAGE_SIZE } from '@/common/utils/common.constants';
import { CreateOrderToProductDto } from './dto/order-to-product.entity';
import { Product } from '../products/entities/product.entity';
import { OrderToProduct } from './entities/order-to-product.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(OrderToProduct)
    private readonly orderToProductRepository: Repository<OrderToProduct>,
  ) {}
  async create(createOrderDto: CreateOrderDto) {
    const orderToProductsWithPrice = await Promise.all(
      createOrderDto.orderToProducts.map((orderToProduct) =>
        this.createOrderToProductWithPrice(orderToProduct),
      ),
    );
    const order = this.ordersRepository.create({
      ...createOrderDto,
      orderToProducts: orderToProductsWithPrice,
    });
    return this.ordersRepository.save(order);
  }

  findAll(paginateDto?: PaginateDto) {
    return this.ordersRepository.find({
      skip: paginateDto.offset,
      take: paginateDto.limit ?? DEFAULT_PAGE_SIZE.ORDER,
    });
  }

  async findOne(id: number) {
    const order = await this.ordersRepository.findOne({
      where: {
        id,
      },
      relations: {
        payment: true,
        user: true,
        orderToProducts: {
          product: true,
        },
      },
    });
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    return order;
  }

  async remove(id: number) {
    const order = await this.findOne(id);
    return this.ordersRepository.remove(order);
  }

  async createOrderToProductWithPrice(
    orderToProduct: CreateOrderToProductDto,
  ): Promise<OrderToProduct> {
    const product = await this.productRepository.findOne({
      where: {
        id: orderToProduct.product.id,
      },
    });

    if (!product) {
      throw new NotFoundException(
        `Product with id ${orderToProduct.product.id} not found`,
      );
    }

    return this.orderToProductRepository.create({
      ...orderToProduct,
      price: product.price,
    });
  }
}
