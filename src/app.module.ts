import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './user/users.module';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import { ComplaintsModule } from './complaints/complaints.module';
import { VoucherModule } from './voucher/voucher.module';
import { OrderModule } from './order/order.module';
import { LoyaltySettingModule } from './loyalty-setting/loyalty-setting.module';

@Module({
  imports: [
    UsersModule,
    ProductModule,
    AuthModule,
    ShoppingCartModule,
    ComplaintsModule,
    VoucherModule,
    OrderModule,
    LoyaltySettingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
