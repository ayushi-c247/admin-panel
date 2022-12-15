import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Otp, OtpSchema } from './schema/otp.schema';
import { OtpRepository } from './otp.repository';
import { OtpService } from './otp.service';
import { OtpController } from './otp.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Otp.name, schema: OtpSchema }])],
  controllers: [OtpController],
  exports: [OtpRepository, OtpService],
  providers: [OtpRepository, OtpService],
})
export class OtpModule {}
