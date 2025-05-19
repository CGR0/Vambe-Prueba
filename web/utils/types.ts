import {
  DailyConsultations,
  HowCameToVambe,
  BusinessLine,
  BusinessStage,
} from './enums';

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  meetings?: Meeting[];
}

export interface Meeting {
  id: string;
  date: Date;
  closed: boolean;
  client?: Client;
  seller?: Seller;
  transcription?: Transcription;
}

export interface Seller {
  id: string;
  name: string;
  meetings?: Meeting[];
}

export interface Transcription {
  id: string;
  transcription: string;
  business_line?: BusinessLine;
  daily_consultations?: DailyConsultations;
  business_stage?: BusinessStage;
  how_came_to_vambe?: HowCameToVambe;
  problem?: string;
  reasons?: string;
  meeting?: Meeting;
}
