import { Controller, Get, Query } from '@nestjs/common';
import { TranscriptionService } from './transcription.service';
import { Transcription } from './transcription.entity';

@Controller('transcriptions')
export class TranscriptionController {
  constructor(private transcriptionService: TranscriptionService) {}

  @Get()
  async listAll(@Query('entities') entities: string): Promise<Transcription[]> {
    return this.transcriptionService.listAll(entities);
  }
}
