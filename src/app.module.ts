import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { ConfigsModule } from './config/configs.module';

@Module({
  imports: [ConfigsModule, UserModule, ProductModule, OrderModule],
})
export class AppModule {}
