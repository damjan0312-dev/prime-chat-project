import { User, UserDocument } from '../schema/user.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { EntityRepository } from 'src/database/entity.repository';

@Injectable()
export class UserRepository extends EntityRepository<UserDocument> {
    constructor(@InjectModel('USER') userModel: Model<UserDocument>) {
        super(userModel);
    }
}
