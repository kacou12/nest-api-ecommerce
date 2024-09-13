import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from '@/domain/users/users.module';
import { OrdersModule } from './domain/orders/orders.module';
import { ProductsModule } from './domain/products/products.module';
import { CategoriesModule } from './domain/categories/categories.module';
import { PaymentsModule } from './domain/payments/payments.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

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
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env.prod'],
      load: [configuration],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
