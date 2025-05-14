import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './client.entity';
import { CreateClientDto } from './dto/create.dto';
import { ClassificationService } from 'src/classification/classification.service';
import { getByIdQueryWithEntityJoin } from 'src/utils/functions/query-helpers';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client) private clientRepository: Repository<Client>,
    private classificationService: ClassificationService,
  ) {}

  async listAll(): Promise<Client[]> {
    return this.clientRepository.find();
  }

  async create(createClientDto: CreateClientDto): Promise<Client> {
    try {
      const client = await this.clientRepository.findOne({
        where: { email: createClientDto.email },
      });
      if (client) {
        return client;
      }
      const newClient = this.clientRepository.create(createClientDto);
      const classification = await this.classificationService.create();
      newClient.classification = classification;
      return this.clientRepository.save(newClient);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findById(id: string, entities: string = ''): Promise<Client> {
    try {
      const query = await getByIdQueryWithEntityJoin(
        'client',
        id,
        entities,
        this.clientRepository,
      );
      const client = await query.getOne();
      return client;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
