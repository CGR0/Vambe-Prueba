import { Classification } from 'src/classification/classification.entity';
import { Meeting } from 'src/meeting/meeting.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
} from 'typeorm';

@Entity()
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @OneToMany(() => Meeting, (meeting) => meeting.client)
  meetings: Meeting[];

  @OneToOne(() => Classification, (classification) => classification.client)
  classification: Classification;
}
