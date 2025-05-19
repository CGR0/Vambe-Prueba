import { Module } from '@nestjs/common';
import { LLMService } from './llm.service';
import { LLMController } from './llm.controller';

@Module({
  imports: [],
  providers: [LLMService],
  controllers: [LLMController],
  exports: [LLMService],
})
export class LLMModule {}
