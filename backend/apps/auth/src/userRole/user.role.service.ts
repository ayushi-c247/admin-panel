import { Injectable } from '@nestjs/common';
import { UserRoleRepository } from './user.role.repository';


@Injectable()
export class UserRoleService {
  constructor(private readonly userRoleRepository: UserRoleRepository) {}
  async createUserRole() {
    const roles: any = [
      {
        name: 'admin',
        permissionAccess: {
          categories: {
            read: true,
            write: true,
            admin: true,
          },
          order: {
            read: true,
            write: true,
            admin: true,
          },
          product: {
            read: true,
            write: true,
            admin: true,
          },
          users: {
            read: true,
            write: true,
            admin: true,
          },
          deliveryPartners: {
            read: true,
            write: true,
            admin: true,
          },
          inventoryPartners: {
            read: true,
            write: true,
            admin: true,
          },
          setting: {
            read: true,
            write: true,
            admin: true,
          },
        },
      },
      {
        name: 'inventory-partner',
        permissionAccess: {
          categories: {
            read: true,
            write: true,
            admin: false,
          },
          order: {
            read: true,
            write: true,
            admin: false,
          },
          product: {
            read: true,
            write: true,
            admin: false,
          },
          users: {
            read: false,
            write: false,
            admin: false,
          },
          deliveryPartners: {
            read: false,
            write: false,
            admin: false,
          },
          inventoryPartners: {
            read: false,
            write: false,
            admin: false,
          },
          setting: {
            read: false,
            write: false,
            admin: false,
          },
        },
      },
      {
        name: 'delivery-partner',
        permissionAccess: {
          order: {
            read: true,
            write: true,
            admin: false,
          },
          categories: {
            read: false,
            write: false,
            admin: false,
          },
          product: {
            read: false,
            write: false,
            admin: false,
          },
          users: {
            read: false,
            write: false,
            admin: false,
          },
          deliveryPartners: {
            read: false,
            write: false,
            admin: false,
          },
          inventoryPartners: {
            read: false,
            write: false,
            admin: false,
          },
          setting: {
            read: false,
            write: false,
            admin: false,
          },
        },
      },
    ];
    let existingRoles: any = await this.userRoleRepository.find();
    if (existingRoles.length) {
      if (roles.length > existingRoles.length) {
        for (let index: number = 0; index < roles.length; index++) {
          if (
            existingRoles
              .map((data: any) => data.name)
              .indexOf(roles[index].name) !== -1
          ) {
          } else {
            let data: any = {
              permissionAccess: roles[index].permissionAccess,
              name: roles[index].name,
            };
            await this.userRoleRepository.create(data);
            console.log(`${roles[index].name} : New role added successfully`);
          }
        }
        return;
      }
      console.log(`${existingRoles.length}: Roles already added`);
    } else {
      await this.userRoleRepository.insertMany(roles);
      console.log(`Roles added successfully`);
    }

    for (let index: number = 0; index < roles.length; index++) {
      for (let i: number = 0; i < existingRoles.length; i++) {
        if (roles[index].name === existingRoles[i].name) {
          await this.userRoleRepository.findOneAndUpdate(
            { _id: existingRoles[i]._id},
            { permissionAccess: roles[i].permissionAccess },
          );
        }
      }
    }
  }
  async findUser(){
    return await this.userRoleRepository.findOne({name:"admin"});
  }
}
