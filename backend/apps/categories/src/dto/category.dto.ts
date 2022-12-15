import { IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  id: string;
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  parentCategory: string;
}