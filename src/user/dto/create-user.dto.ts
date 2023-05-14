import { IsString, IsUUID, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsUUID()
  id: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  email: string;
}
