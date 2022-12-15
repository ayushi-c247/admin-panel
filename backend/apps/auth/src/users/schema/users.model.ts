
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';
import { UserRole } from '../../userRole/schemas/user.role.schema';
import mongoose from 'mongoose';

@Schema({ versionKey: false })
export class User extends AbstractDocument {
  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  fullName: string;

  @Prop()
  idProof: string;

  @Prop( { type: mongoose.Schema.Types.ObjectId, ref: UserRole.name })
  mainRole: string;
  
  @Prop()
  profileImage: string;
  
}

export const UserSchema = SchemaFactory.createForClass(User);


