import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from 'src/database/entity.repository';
import { UserDocument } from '../../users/schema/user.schema';

@Injectable()
export class AuthRepository extends EntityRepository<UserDocument> {
    constructor(@InjectModel('USER') userModel: Model<UserDocument>) {
        super(userModel);
    }
}
