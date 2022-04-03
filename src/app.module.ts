import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './user/users.module';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';

@Module({
  imports: [UsersModule, ProductModule, AuthModule, ShoppingCartModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
