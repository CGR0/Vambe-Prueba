import { IsString, IsNotEmpty, Matches } from 'class-validator';

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, {
    message: 'Email no válido',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;
}
