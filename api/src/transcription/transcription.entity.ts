import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Meeting } from '../meeting/meeting.entity';
import {
  BusinessLine,
  DailyConsultations,
  BusinessStage,
  HowCameToVambe,
} from '../utils/enums';

@Entity()
export class Transcription {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  transcription: string;

  @Column({ nullable: true })
  business_line: BusinessLine;

  @Column({ nullable: true })
  daily_consultations: DailyConsultations;

  @Column({ nullable: true })
  business_stage: BusinessStage;

  @Column({ nullable: true })
  how_came_to_vambe: HowCameToVambe;

  @Column({ nullable: true })
  problem: string;

  @Column({ nullable: true })
  reasons: string;

  @Column({ nullable: true })
  expectations: string;

  @OneToOne(() => Meeting, (meeting) => meeting.transcription)
  meeting: Meeting;
}
