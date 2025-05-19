import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create.dto';
import { Client } from './client.entity';

@Controller('clients')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Get()
  async listAll(): Promise<Client[]> {
    return this.clientService.listAll();
  }

  @Post()
  async create(@Body() createClientDto: CreateClientDto): Promise<Client> {
    return this.clientService.create(createClientDto);
  }
}
