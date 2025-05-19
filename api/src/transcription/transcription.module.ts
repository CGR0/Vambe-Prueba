import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TranscriptionService } from './transcription.service';
import { Transcription } from './transcription.entity';
import { LLMModule } from '../llm/llm.module';
import { TranscriptionController } from './transcription.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Transcription]), LLMModule],
  providers: [TranscriptionService],
  controllers: [TranscriptionController],
  exports: [TranscriptionService],
})
export class TranscriptionModule {}
