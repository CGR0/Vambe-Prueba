import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Transcription } from './transcription.entity';
import { CreateTranscriptionDto } from './dto/create.dto';
import { LLMService } from '../llm/llm.service';
import { getAllQueryWithEntityJoin } from '../utils/functions/query-helpers';
import { UpdateTranscriptionDto } from './dto/update.dto';

@Injectable()
export class TranscriptionService {
  constructor(
    @InjectRepository(Transcription)
    private transcriptionRepository: Repository<Transcription>,
    private llmService: LLMService,
  ) {}

  async listAll(entities: string = ''): Promise<Transcription[]> {
    try {
      const query = await getAllQueryWithEntityJoin(
        'transcription',
        entities,
        this.transcriptionRepository,
      );
      return query.getMany();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async create(
    createTranscriptionDto: CreateTranscriptionDto,
  ): Promise<Transcription> {
    try {
      const transcription = this.transcriptionRepository.create(
        createTranscriptionDto,
      );
      const savedTranscription =
        await this.transcriptionRepository.save(transcription);
      const transctiptionData = await this.llmService.classifyTranscription(
        savedTranscription.transcription,
      );
      return await this.update(savedTranscription.id, transctiptionData);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(id: string): Promise<Transcription> {
    try {
      const transcription = await this.transcriptionRepository.findOne({
        where: { id },
      });
      if (!transcription) {
        throw new NotFoundException('Transcription not found');
      }
      return transcription;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(
    id: string,
    updateTranscriptionDto: UpdateTranscriptionDto,
  ): Promise<Transcription> {
    try {
      const transcription = await this.findOne(id);
      Object.assign(transcription, updateTranscriptionDto);
      return await this.transcriptionRepository.save(transcription);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findByText(text: string): Promise<string> {
    const query = await getAllQueryWithEntityJoin(
      'transcription',
      'meeting',
      this.transcriptionRepository,
    );
    const transcriptions = await query.getMany();
    const transcription = transcriptions.find(
      (transcription) => transcription.transcription === text,
    );
    return transcription.meeting.id;
  }
}
