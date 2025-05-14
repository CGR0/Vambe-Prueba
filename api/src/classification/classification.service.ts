import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Classification } from './classification.entity';

@Injectable()
export class ClassificationService {
  constructor(
    @InjectRepository(Classification)
    private classificationRepository: Repository<Classification>,
  ) {}

  async listAll(): Promise<Classification[]> {
    return this.classificationRepository.find();
  }

  async create(): Promise<Classification> {
    try {
      const classification = this.classificationRepository.create();
      return this.classificationRepository.save(classification);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
