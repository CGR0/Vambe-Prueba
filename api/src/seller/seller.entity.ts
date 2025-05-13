import { Meeting } from 'src/meeting/meeting.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Seller {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Meeting, (meeting) => meeting.seller)
  meetings: Meeting[];
}
