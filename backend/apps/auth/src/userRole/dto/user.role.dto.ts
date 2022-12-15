import {
    IsString,
    IsNotEmpty,
    IsObject,
  } from 'class-validator';
    
  interface PermissionsSubCategory {
    read: boolean;
    write: boolean;
    admin: boolean;
  }
export interface PermissionAccessObject {
    categories: PermissionsSubCategory;
    order: PermissionsSubCategory;
    product: PermissionsSubCategory;
    users: PermissionsSubCategory;
    inventoryPartners: PermissionsSubCategory;
    deliveryPartners: PermissionsSubCategory;
    setting: PermissionsSubCategory;
  }

  export class UserRoleDto {
    id:string;
    @IsObject()
    @IsNotEmpty()
    permissions: PermissionAccessObject;
    @IsString()
    @IsNotEmpty()
    fullName: string;
    @IsString()
    @IsNotEmpty()
    mainRole: string;
  }
  