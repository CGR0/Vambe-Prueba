import { IsString, IsNotEmpty } from 'class-validator';

export class CreateSellerDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
