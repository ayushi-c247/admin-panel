import { Controller, Get, Query } from '@nestjs/common';

import { OtpDto } from '../otp/dto/otp.dto';
import { OtpService } from './otp.service';

@Controller('otp')
export class OtpController {
  constructor(private otpService: OtpService) {}

  @Get()
  getOtp(@Query() otpDto: OtpDto) {
    console.log("otpDto---------------------------",otpDto);
    return this.otpService.getOtp(otpDto);
  }
}
