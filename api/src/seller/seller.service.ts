import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Seller } from './seller.entity';
import { CreateSellerDto } from './dto/create.dto';
import { getByIdQueryWithEntityJoin } from 'src/utils/functions/query-helpers';

@Injectable()
export class SellerService {
  constructor(
    @InjectRepository(Seller) private sellerRepository: Repository<Seller>,
  ) {}

  async listAll(): Promise<Seller[]> {
    return this.sellerRepository.find();
  }

  async create(createSellerDto: CreateSellerDto): Promise<Seller> {
    try {
      const seller = await this.sellerRepository.findOne({
        where: { name: createSellerDto.name },
      });
      if (seller) {
        return seller;
      }
      const newSeller = this.sellerRepository.create(createSellerDto);
      return this.sellerRepository.save(newSeller);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findById(id: string, entities: string = ''): Promise<Seller> {
    try {
      const query = await getByIdQueryWithEntityJoin(
        'seller',
        id,
        entities,
        this.sellerRepository,
      );
      const seller = await query.getOne();
      return seller;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
