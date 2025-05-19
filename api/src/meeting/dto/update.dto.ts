import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class UpdateMeetingDto {
  @IsBoolean()
  @IsOptional()
  closed: boolean;

  @IsString()
  @IsOptional()
  transcription: string;
}
