import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRole, UserRoleSchema } from './schemas/user.role.schema';
import { UserRoleRepository } from './user.role.repository';
import { UserRoleService } from './user.role.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: UserRole.name, schema: UserRoleSchema }]),
      ],
    exports:[UserRoleService],
    providers:[UserRoleRepository,UserRoleService]
})
export class UserRoleModule {}