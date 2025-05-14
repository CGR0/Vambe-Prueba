import { Classification } from 'src/classification/classification.entity';
import { Meeting } from 'src/meeting/meeting.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phone: string;

  @OneToMany(() => Meeting, (meeting) => meeting.client)
  meetings: Meeting[];

  @OneToOne(() => Classification, (classification) => classification.client, {
    cascade: true,
  })
  @JoinColumn()
  classification: Classification;
}
