import { IsString, IsNotEmpty } from 'class-validator';

export class CreateTranscriptionDto {
  @IsString()
  @IsNotEmpty()
  transcription: string;
}
