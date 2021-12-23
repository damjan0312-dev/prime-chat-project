import { User } from './../../users/schema/user.schema';
import { ChannelRepository } from './channel.repository';
import { UserRepository } from '../../users/repositories/user.repository';
import { IUser } from '../../users/interface/user.interface';
import { UsersService } from './../../users/service/users.service';
import { Injectable, Req } from '@nestjs/common';
import { IChannel } from './channel.interface';
import {
    omitBy,
    isUndefined,
    cloneDeep,
    findIndex,
    differenceBy
} from 'lodash';
import { Channel } from './channel.schema';
import { HttpErrorCode } from 'src/utils/enums/httpErrorCode.enum';
import * as mongoose from 'mongoose';

@Injectable()
export class ChannelService {
    constructor(
        private readonly channelRepository: ChannelRepository,
        private readonly usersService: UsersService,
        private readonly userRepository: UserRepository
    ) {}

    async create(data: Channel, user: User) {
        const channel = new Channel();
        channel._id = new mongoose.Types.ObjectId(data._id);
        channel.name = data.name;
        channel.purpose = data.purpose;
        channel.private = data.private;
        channel.createdBy = user._id;
        //channel.users = [user];
        return await this.channelRepository.create(channel);
    }

    /**
     * @param req Contains needed user details
     * @returns All channels created by the currently logged in user
     */
    async findAll(@Req() req) {
        try {
            return await this.channelRepository.find(
                { createdBy: req.user._id },
                null,
                'createdBy'
            );
        } catch (error) {
            throw error;
        }
    }

    async findOne(id: number): Promise<Channel> {
        const channel = await this.channelRepository.findOne({ id });

        if (channel) {
            return channel;
        } else {
            throw new Error(HttpErrorCode.NOT_FOUND);
        }
    }

    async update(id: string, data: IChannel, user: IUser) {
        const channel: Channel = await this.channelRepository.findById(id);
        try {
            if (channel.createdBy.toString() === user._id) {
                return await this.channelRepository.findOneAndUpdate(
                    { _id: channel._id },
                    data
                );
            } else {
                throw new Error(HttpErrorCode.INVALID_PERMISSIONS);
            }
        } catch (error) {
            throw error;
        }
    }

    async delete(id: string, user: User) {
        const channel: Channel = await this.channelRepository.findById(id);

        try {
            if (channel.createdBy._id.toString() === user._id.toString()) {
                return await this.channelRepository.deleteOne({
                    _id: channel._id
                });
            } else {
                throw new Error(HttpErrorCode.INVALID_PERMISSIONS);
            }
        } catch (error) {
            throw error;
        }
    }

    // async favorite(id: number, user: IUser) {
    //     const channel = await this.findOneWithUser(id, user._id);

    //     try {
    //         const completedUser = await this.usersService.getByEmail(
    //             user.email,
    //             true
    //         );
    //         const favoriteChannels = cloneDeep(completedUser.favoriteChannels);
    //         const favoriteChannelIndex = findIndex(
    //             favoriteChannels,
    //             (element) => element.id === id
    //         );

    //         if (favoriteChannelIndex > -1) {
    //             favoriteChannels.splice(favoriteChannelIndex, 1);
    //         } else {
    //             favoriteChannels.unshift(channel);
    //         }

    //         this.userRepository.create({
    //             ...completedUser,
    //             favoriteChannels
    //         });
    //     } catch (error) {
    //         throw error;
    //     }
    // }
}
