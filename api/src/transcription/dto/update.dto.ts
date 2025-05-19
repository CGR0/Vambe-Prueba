import { IsString, IsOptional } from 'class-validator';
import {
  DailyConsultations,
  HowCameToVambe,
  BusinessStage,
  BusinessLine,
} from 'src/utils/enums';

export class UpdateTranscriptionDto {
  @IsString()
  @IsOptional()
  business_line?: BusinessLine;

  @IsString()
  @IsOptional()
  business_stage?: BusinessStage;

  @IsString()
  @IsOptional()
  daily_consultations?: DailyConsultations;

  @IsString()
  @IsOptional()
  how_came_to_vambe?: HowCameToVambe;

  @IsString()
  @IsOptional()
  problem?: string;

  @IsString()
  @IsOptional()
  reasons?: string;

  @IsString()
  @IsOptional()
  expectations?: string;
}
