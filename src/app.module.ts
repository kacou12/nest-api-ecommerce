import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from '@/domain/users/users.module';
import { OrdersModule } from './domain/orders/orders.module';
import { ProductsModule } from './domain/products/products.module';
import { CategoriesModule } from './domain/categories/categories.module';
import { PaymentsModule } from './domain/payments/payments.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsersModule,
    CommonModule,
    DatabaseModule,
    OrdersModule,
    ProductsModule,
    CategoriesModule,
    PaymentsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
