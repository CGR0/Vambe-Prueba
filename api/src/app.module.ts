import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { configLoader } from './config/config-loader';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LLMModule } from './llm/llm.module';
import { ClientModule } from './client/client.module';
import { SellerModule } from './seller/seller.module';
import { MeetingModule } from './meeting/meeting.module';
import { dbConfig } from './config/db';
import { TranscriptionModule } from './transcription/transcription.module';
import * as dotenv from 'dotenv';

dotenv.config({
  path: '.env',
});

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    ConfigModule.forRoot({
      load: [configLoader],
      isGlobal: true,
    }),
    LLMModule,
    ClientModule,
    SellerModule,
    MeetingModule,
    TranscriptionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
