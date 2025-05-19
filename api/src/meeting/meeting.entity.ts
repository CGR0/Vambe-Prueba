import { Client } from 'src/client/client.entity';
import { Seller } from 'src/seller/seller.entity';
import { Transcription } from 'src/transcription/transcription.entity';
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
