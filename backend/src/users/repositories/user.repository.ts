import { UserDocument } from '../schema/user.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EntityRepository } from 'src/database/entity.repository';
import { Model } from 'mongoose';

@Injectable()
export class UserRepository extends EntityRepository<UserDocument> {
    constructor(@InjectModel('USER') userModel: Model<UserDocument>) {
        super(userModel);
    }
}
