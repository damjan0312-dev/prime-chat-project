import { UserRepository } from 'src/users/repositories/user.repository';
import { Channel } from 'src/chat/channel/channel.schema';
import { ChannelDocument } from './channel.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EntityRepository } from 'src/database/entity.repository';
import { Model } from 'mongoose';

@Injectable()
export class ChannelRepository extends EntityRepository<ChannelDocument> {
    constructor(
        private readonly userRepository: UserRepository,
        @InjectModel('CHANNEL') channelModel: Model<ChannelDocument>
    ) {
        super(channelModel);
    }
}
