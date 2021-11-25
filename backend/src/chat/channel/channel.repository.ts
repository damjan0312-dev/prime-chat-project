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

    async findUserChannels(_id: string): Promise<Channel[]> {
        try {
            return (await this.userRepository.findOne({ _id })).channels;
        } catch (error) {
            throw error;
        }
    }
    async findUserFavoriteChannels(_id: string): Promise<Channel[]> {
        try {
            return (await this.userRepository.findOne({ _id }))
                .favoriteChannels;
        } catch (error) {
            throw error;
        }
    }
}
