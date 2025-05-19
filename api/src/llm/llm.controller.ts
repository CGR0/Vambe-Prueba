import { Controller, Post, Body } from '@nestjs/common';
import { LLMService } from './llm.service';

@Controller('llm')
export class LLMController {
  constructor(private llmService: LLMService) {}

  @Post()
  async create(@Body() body: { transcription: string }) {
    return this.llmService.classifyTranscription(body.transcription);
  }
}
