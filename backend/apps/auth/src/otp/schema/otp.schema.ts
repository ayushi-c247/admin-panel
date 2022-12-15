import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';
import { Date, now } from 'mongoose';

@Schema({ versionKey: false })
export class Otp extends AbstractDocument {
  @Prop()
  otp: number;

  @Prop()
  email: string;

  @Prop()
  verifyToken: string;

  @Prop({ default: now(), expires:"5m" })
  expireAt: Date;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const OtpSchema = SchemaFactory.createForClass(Otp);
