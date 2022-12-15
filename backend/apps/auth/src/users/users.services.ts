import * as bcrypt from 'bcrypt';
import { ConflictException, HttpException, Injectable } from '@nestjs/common';
import { AvailableTemplates, EmailService } from '@app/common';
import { encryption, decryption } from '@app/common';
import { UsersRepository } from './users.repository';
import {
  CreateUserDto,
  UpdateUserDto,
  ChangePasswordDto,
  ForgetPasswordDto,
  ResetPasswordDto,
} from './dto/users.dto';
import { OtpRepository } from '../otp/otp.repository';
import { OtpService } from '../otp/otp.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly emailService: EmailService,
    private readonly otpRepository: OtpRepository,
    private readonly otpService: OtpService,
  ) {}
  // Registration API

  async registration(createUserDto: CreateUserDto, file: any) {
    const user = await this.userRepository.findOne({
      email: createUserDto.email,
    });

    if (user) {
      throw new ConflictException('user already exists!!');
    } else {
      if (file) {
        createUserDto.profileImage = file.filename;
      }
      const userName = await this.userRepository.findOne({
        email: createUserDto.email,
      });
      if (userName) {
        throw new ConflictException(
          'This username alreday exists, please select different username!!',
        );
      } else {
        const hashPassword = await bcrypt.hash(createUserDto.password, 10);
        createUserDto.password = hashPassword;
        return this.userRepository.create(createUserDto);
      }
    }
  }

  // Get USer Profile
  async getUserProfile(req: any) {
    const user = await this.userRepository.findOne({
      email: req.user.email,
    });
    if (user) {
      return user;
    }
    throw new HttpException('User Not Found!!', 404);
  }

  // Delete User API
  async deleteUser(req: any) {
    const user = await this.userRepository.findOne({
      email: req.user.email,
    });
    if (user) {
      this.userRepository.deleteOne({ email: req.user.email });
      return 'User deleted successfully!!';
    }
    throw new HttpException('User Not Found!!', 404);
  }

  // Update Profile API
  async updateProfile(updateUserDto: UpdateUserDto, req: any, file: any) {
    const user = await this.userRepository.findOne({
      email: req.user.email,
    });
    if (user) {
      if (file) {
        updateUserDto.profileImage = file.filename;
      }

      const hashPassword = await bcrypt.hash(updateUserDto.password, 10);
      updateUserDto.password = hashPassword;

      this.userRepository.findOneAndUpdate(
        { email: req.user.email },
        updateUserDto,
      );
      return 'Profile Updated successfully!!';
    }
    throw new HttpException('User Not Found!!', 404);
  }

  // Change PassWord API
  async changePassword(changePasswordDto: ChangePasswordDto, req: any) {
    const user = await this.userRepository.findOne({
      email: req.user.email,
    });
    if (user) {
      const oldPasswordMatch = await bcrypt.compare(
        changePasswordDto.oldPassword,
        user.password,
      );
      if (oldPasswordMatch) {
        const hashPassword = await bcrypt.hash(
          changePasswordDto.newPassword,
          10,
        );
        await this.userRepository.findOneAndUpdate(
          { email: req.user.email },
          { password: hashPassword },
        );
        return 'Password changed successfully!!';
      }
      throw new HttpException('Please enter correct password!!', 400);
    }
    throw new HttpException('User Not Found!!', 404);
  }

  //Forget Password API
  async forgetPassword(forgetPasswordDto: ForgetPasswordDto) {
    const user = await this.userRepository.findOne({
      email: forgetPasswordDto.email,
    });

    if (user) {
      const encryptedEmail = encryption(forgetPasswordDto.email);
      const verificationToken = encryption(forgetPasswordDto.email + user._id);
      await this.userRepository.findOneAndUpdate(
        { email: forgetPasswordDto.email },
        { verifyToken: verificationToken },
      );
      const otpdataCreate = {
        otp: Math.floor(100000 + Math.random() * 900000),
        verifyToken: verificationToken,
        email: user.email,
      };
      let getOtp = await this.otpService.createOtp(otpdataCreate);

      await this.emailService.setTemplate(AvailableTemplates.OTP, {
        fullName: `${user.fullName}`,
        verifyToken: verificationToken,
        email: encryptedEmail,
        otp: getOtp.otp,
      });
      await this.emailService.sendMail(user.email);
      return { message:"Link send to your mail",verificationToken, encryptedEmail, otp: getOtp.otp };
    }
    throw new HttpException('User Not Found!!', 404);
  }

  // Verify API for Forget Password
  async verifyLink(forgetPasswordDto: ForgetPasswordDto) {
    const user = await this.userRepository.findOne({
      email: forgetPasswordDto.email,
      verifyToken: forgetPasswordDto.verifyToken,
    });
    if (user) {
      return 'Verify !!';
    }
    throw new HttpException('Link Expired !!', 200);
  }

  //Reset Password API
  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const user = await this.userRepository.findOne({
      email: resetPasswordDto.email,
      verifyToken: resetPasswordDto.verifyToken,
    });
    if (user) {
      let getOtp = await this.otpService.getOtp({
        otp: resetPasswordDto.otp,
        email: resetPasswordDto.email,
        verifyToken: resetPasswordDto.verifyToken,
      });
      if (getOtp) {
        if (resetPasswordDto.confirmPassword === resetPasswordDto.password) {
          const hashPassword = await bcrypt.hash(resetPasswordDto.password, 10);
          await this.userRepository.findOneAndUpdate(
            { email: user.email },
            { password: hashPassword },
          );
          await this.otpService.deleteOtp();
          return 'Password changed successfully!!';
        } else {
          return 'Please enter correct password!!';
        }
      }
    }
    throw new HttpException('Link Expire', 400);
  }

  //Find by Email API
  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({ email });
    if (user) {
      return this.userRepository.findOne({ email });
    }
    throw new HttpException('Invalid credentials!!', 400);
  }
  async createUserSeeder(getuser: any) {
    let data = {
      email: 'admin@gmail.com',
      password: 'admin@123',
      fullName: 'admin',
      idProof: 'admin123',
      mainRole: getuser._id,
      role: 'admin',
      permissions: 'xyz',
      profileImage: '',
    };
    const user = await this.userRepository.findOne({
      email: data.email,
    });
    if (user) {
      console.log('user already exists!!');
    } else {
      const hashPassword = await bcrypt.hash(data.password, 10);
      data.password = hashPassword;
      return this.userRepository.create(data);
    }
  }

  async gethh() {
    return this.userRepository.find();
  }
}
