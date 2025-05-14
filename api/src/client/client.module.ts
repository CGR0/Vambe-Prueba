import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { Client } from './client.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassificationModule } from '../classification/classification.module';

@Module({
  imports: [TypeOrmModule.forFeature([Client]), ClassificationModule],
  providers: [ClientService],
  controllers: [ClientController],
  exports: [ClientService],
})
export class ClientModule {}
