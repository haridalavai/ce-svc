import { IsString, IsUUID, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  email: string;

  @IsString()
  authId: string;
}
