import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Meeting } from './meeting.entity';
import { CreateMeetingDto } from './dto/create.dto';
import { ClientService } from 'src/client/client.service';
import { SellerService } from 'src/seller/seller.service';
import { Seller } from 'src/seller/seller.entity';
import { Client } from 'src/client/client.entity';

@Injectable()
export class MeetingService {
  constructor(
    @InjectRepository(Meeting) private meetingRepository: Repository<Meeting>,
    private clientService: ClientService,
    private sellerService: SellerService,
  ) {}

  async listAll(): Promise<Meeting[]> {
    return this.meetingRepository.find();
  }

  async create(createMeetingDto: CreateMeetingDto): Promise<Meeting> {
    try {
      const meeting = this.meetingRepository.create(createMeetingDto);
      const client = await this.clientService.findById(
        createMeetingDto.clientId,
      );
      const seller = await this.sellerService.findById(
        createMeetingDto.sellerId,
      );
      this.checkExistingEntities(client, seller);
      meeting.client = client;
      meeting.seller = seller;
      return this.meetingRepository.save(meeting);
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
