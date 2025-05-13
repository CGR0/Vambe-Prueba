import { Client } from 'src/client/client.entity';
import { Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Classification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Client, (client) => client.classification)
  client: Client;
}
