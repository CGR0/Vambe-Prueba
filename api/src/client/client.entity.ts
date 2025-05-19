import { Meeting } from 'src/meeting/meeting.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

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
}
