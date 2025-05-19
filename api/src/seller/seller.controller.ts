import { Controller, Get, Post, Body } from '@nestjs/common';
import { SellerService } from './seller.service';
import { CreateSellerDto } from './dto/create.dto';
import { Seller } from './seller.entity';
@Controller('sellers')
export class SellerController {
  constructor(private sellerService: SellerService) {}

  @Get()
  async listAll(): Promise<Seller[]> {
    return this.sellerService.listAll();
  }

  @Post()
  async create(@Body() createSellerDto: CreateSellerDto): Promise<Seller> {
    return this.sellerService.create(createSellerDto);
  }
}
