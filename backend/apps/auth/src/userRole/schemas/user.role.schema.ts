
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';

@Schema({_id: false})
export class PermissionAccess {
  @Prop({ required: true })
  read: boolean;
  @Prop({ required: true })
  write: boolean;
  @Prop({ required: true })
  admin: boolean;
}

@Schema({_id: false})
export class PermissionSubModule  {
  @Prop({ required: true })
  categories: PermissionAccess;
  @Prop({ required: true })
  order: PermissionAccess;
  @Prop({ required: true })
  product: PermissionAccess;
  @Prop({ required: true })
  users: PermissionAccess;
  @Prop({ required: true })
  inventoryPartners: PermissionAccess;
  @Prop({ required: true })
  deliveryPartners: PermissionAccess;
  @Prop({ required: true })
  setting: PermissionAccess;
}

@Schema()
export class UserRole extends AbstractDocument {
  @Prop()
  name: string;

  @Prop()
  permissionAccess: PermissionSubModule
}

export const UserRoleSchema = SchemaFactory.createForClass(UserRole);









