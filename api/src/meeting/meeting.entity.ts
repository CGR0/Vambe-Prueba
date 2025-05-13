import { Client } from 'src/client/client.entity';
import { Seller } from 'src/seller/seller.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Meeting {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: Date;

  @Column()
  transcription: string;

  @Column()
  closed: boolean;

  @ManyToOne(() => Client, (client) => client.meetings)
  client: Client;

  @ManyToOne(() => Seller, (seller) => seller.meetings)
  seller: Seller;
}
