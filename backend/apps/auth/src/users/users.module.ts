import { Module } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UserController } from './users.controller';
import { UserService } from './users.services';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/users.model';
import { EmailModule } from '@app/common';
import {OtpModule} from "../otp/otp.module"
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../../../auth/.env',
    }),
    EmailModule,
    OtpModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService, UsersRepository],
  exports: [UserService],
})
export class UsersModule {}
