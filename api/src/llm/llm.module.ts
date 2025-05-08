import { Module } from '@nestjs/common';
import { LLMService } from './llm.service';

@Module({
  imports: [],
  providers: [LLMService],
  controllers: [],
  exports: [LLMService],
})
export class LLMModule {}
