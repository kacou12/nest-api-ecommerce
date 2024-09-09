import { Order } from '@/domain/orders/entities/order.entity';
import { Payment } from './entities/payment.entity';
import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService],
  imports: [TypeOrmModule.forFeature([Payment, Order])],
})
export class PaymentsModule {}
