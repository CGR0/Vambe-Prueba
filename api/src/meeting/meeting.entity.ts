import { Client } from '../client/client.entity';
import { Seller } from '../seller/seller.entity';
import { Transcription } from '../transcription/transcription.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Meeting {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: Date;

  @Column()
  closed: boolean;

  @OneToOne(() => Transcription, (transcription) => transcription.meeting, {
    cascade: true,
  })
  @JoinColumn()
  transcription: Transcription;

  @ManyToOne(() => Client, (client) => client.meetings)
  client: Client;

  @ManyToOne(() => Seller, (seller) => seller.meetings)
  seller: Seller;
}
