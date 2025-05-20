import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Meeting } from './meeting.entity';
import { CreateMeetingDto } from './dto/create.dto';
import { ClientService } from '../client/client.service';
import { SellerService } from '../seller/seller.service';
import { Seller } from '../seller/seller.entity';
import { Client } from '../client/client.entity';
import { TranscriptionService } from '../transcription/transcription.service';
import { getAllQueryWithEntityJoin } from 'src/utils/functions/query-helpers';

@Injectable()
export class MeetingService {
  constructor(
    @InjectRepository(Meeting) private meetingRepository: Repository<Meeting>,
    private clientService: ClientService,
    private sellerService: SellerService,
    private transcriptionService: TranscriptionService,
  ) {}

  async listAll(entities: string = ''): Promise<Meeting[]> {
    const query = await getAllQueryWithEntityJoin(
      'meeting',
      entities,
      this.meetingRepository,
    );
    return query.getMany();
  }

  async create(createMeetingDto: CreateMeetingDto): Promise<Meeting> {
    try {
      const { transcription, ...meetingData } = createMeetingDto;
      const meeting = this.meetingRepository.create(meetingData);
      const client = await this.clientService.findById(
        createMeetingDto.clientId,
      );
      const seller = await this.sellerService.findById(
        createMeetingDto.sellerId,
      );
      this.checkExistingEntities(client, seller);
      const newTranscription = await this.transcriptionService.create({
        transcription,
      });
      meeting.client = client;
      meeting.seller = seller;
      meeting.transcription = newTranscription;

      const savedMeeting = await this.meetingRepository.save(meeting);

      return savedMeeting;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  private async checkExistingEntities(client: Client, seller: Seller) {
    if (!client) {
      throw new BadRequestException('El cliente no existe');
    }
    if (!seller) {
      throw new BadRequestException('El vendedor no existe');
    }
  }
}
