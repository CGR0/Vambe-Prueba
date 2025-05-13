import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Seller } from './seller.entity';

@Injectable()
export class SellerService {
  constructor(
    @InjectRepository(Seller) private sellerRepository: Repository<Seller>,
  ) {}

  async getSellers() {
    return this.sellerRepository.find();
  }
}
