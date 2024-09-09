import { OrderStatuseEnum } from './../orders/enums/order-status.enum';
import { PaginateDto } from '@/common/dto/paginate.dto';
import { DEFAULT_PAGE_SIZE } from '@/common/utils/common.constants';
import { Order } from '@/domain/orders/entities/order.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async payOrder(id: number) {
    const order = await this.orderRepository.findOneBy({ id });
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    const payment = this.paymentRepository.create();
    order.payment = payment;
    order.status = OrderStatuseEnum.AWAIT_SHIPMENT;
    return this.orderRepository.save(order);
  }

  create(createPaymentDto: CreatePaymentDto) {
    const payment = this.paymentRepository.create(createPaymentDto);
    return this.paymentRepository.save(payment);
  }

  findAll(paginateDto?: PaginateDto) {
    return this.paymentRepository.find({
      skip: paginateDto?.offset,
      take: paginateDto?.limit ?? DEFAULT_PAGE_SIZE.DEFAULT,
    });
  }

  async findOne(id: number) {
    const payment = await this.paymentRepository.findOneBy({
      id,
    });
    if (!payment) {
      throw new NotFoundException(`Payment with id ${id} not found`);
    }
    return payment;
  }
}
