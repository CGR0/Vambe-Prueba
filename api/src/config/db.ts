import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Client } from 'src/client/client.entity';
import { Meeting } from 'src/meeting/meeting.entity';
import { Seller } from 'src/seller/seller.entity';
import { configLoader } from './config-loader';
import { Transcription } from 'src/transcription/transcription.entity';

const config = configLoader();

export const dbConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: config.database.host,
  port: config.database.port as unknown as number,
  username: config.database.username,
  password: config.database.password,
  database: config.database.database,
  entities: [Client, Seller, Meeting, Transcription],
  synchronize: config.database.synchronize,
};
