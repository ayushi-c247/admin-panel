
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';

@Schema({ versionKey: false })
export class Category extends AbstractDocument {
  @Prop()
  name: string;

  @Prop()
  parentCategory: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);


