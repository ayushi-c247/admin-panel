import { IsEmail, IsString, IsOptional, IsNotEmpty } from 'class-validator';
import { IsObjectId } from 'class-validator-mongo-object-id';

export class CreateUserDto {
  id: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  fullName: string;
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsString()
  @IsOptional()
  profileImage: string;
  @IsObjectId()
  mainRole: string;
  @IsString()
  @IsNotEmpty()
  idProof: string;
  @IsOptional()
  verifyToken: string;
}

export class ChangePasswordDto {
  id: string;
  @IsString()
  @IsNotEmpty()
  oldPassword: string;
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}

export class UpdateUserDto {
  id: string;
  @IsString()
  @IsNotEmpty()
  fullName: string;
  @IsString()
  @IsNotEmpty()
  userName: string;
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsString()
  @IsOptional()
  profileImage: string;
  @IsString()
  @IsOptional()
  permissions: string;
  @IsString()
  @IsOptional()
  role: string;
}
export class ForgetPasswordDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsOptional()
  verifyToken: string;
}
export class ResetPasswordDto {
  @IsString()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  verifyToken: string;
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  confirmPassword: string;
}
