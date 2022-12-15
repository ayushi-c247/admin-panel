import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { AbstractRepository } from '@app/common';
import { UserRole } from './schemas/user.role.schema';

@Injectable()
export class UserRoleRepository extends AbstractRepository<UserRole> {
  protected readonly logger = new Logger(UserRoleRepository.name);
  constructor(
    @InjectModel(UserRole.name) userRoleModel: Model<UserRole>,
    @InjectConnection() connection: Connection,
  ) {
    super(userRoleModel, connection);
  }
}
