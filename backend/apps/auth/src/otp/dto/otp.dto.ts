import { IsEmail, IsString, IsOptional, IsNotEmpty, IsDate } from 'class-validator';


export class OtpDto {
  id: string;
  @IsNotEmpty()
  @IsString()
  email: string;
  @IsString()
  @IsNotEmpty()
  otp: string;
  @IsString()
  @IsNotEmpty()
  verifyToken: string;
}