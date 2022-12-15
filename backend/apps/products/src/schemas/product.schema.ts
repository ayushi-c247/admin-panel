import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';

@Schema({ versionKey: false })
export class User extends AbstractDocument {
   // @Prop( { type: mongoose.Schema.Types.ObjectId, ref: UserRole.name })
  vendor: string;

  @Prop()
  title: string;

  @Prop()
  shortDecription: string;

  @Prop()
  categories: string;

  @Prop()
  thumbnailImage: string;

  @Prop()
  product: string;

  @Prop()
  shippingAmount: string;

  @Prop()
  actualPrice: string;

  @Prop()
  additionalDetails: string;
}

export const UserSchema = SchemaFactory.createForClass(User);


