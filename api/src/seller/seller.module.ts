import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SellerService } from './seller.service';
import { Seller } from './seller.entity';
import { SellerController } from './seller.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Seller])],
  providers: [SellerService],
  controllers: [SellerController],
  exports: [SellerService],
})
export class SellerModule {}
