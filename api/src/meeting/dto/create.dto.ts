import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateMeetingDto {
  @IsString()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsNotEmpty()
  transcription: string;

  @IsBoolean()
  @IsNotEmpty()
  closed: boolean;

  @IsString()
  @IsNotEmpty()
  clientId: string;

  @IsString()
  @IsNotEmpty()
  sellerId: string;
}
