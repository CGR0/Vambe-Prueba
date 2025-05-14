import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeetingService } from './meeting.service';
import { MeetingController } from './meeting.controller';
import { Meeting } from './meeting.entity';
import { SellerModule } from 'src/seller/seller.module';
import { ClientModule } from 'src/client/client.module';

@Module({
  imports: [TypeOrmModule.forFeature([Meeting]), ClientModule, SellerModule],
  providers: [MeetingService],
  controllers: [MeetingController],
  exports: [MeetingService],
})
export class MeetingModule {}
