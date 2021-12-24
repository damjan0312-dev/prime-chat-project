import { HttpException, HttpStatus, Injectable, Req } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { HttpErrorCode } from 'src/utils/enums/httpErrorCode.enum';
import { IUser } from '../../users/interface/user.interface';
import { UserRepository } from '../../users/repositories/user.repository';
import { User } from './../../users/schema/user.schema';
import { UsersService } from './../../users/service/users.service';
import { IChannel } from './channel.interface';
import { ChannelRepository } from './channel.repository';
import { Channel } from './channel.schema';

@Injectable()
export class ChannelService {
    constructor(
        private readonly channelRepository: ChannelRepository,
        private readonly usersService: UsersService,
        private readonly userRepository: UserRepository
    ) {}

    async findById(id: string) {
        try {
            return await this.channelRepository.findById(id, 'members');
        } catch (error) {
            throw error;
        }
    }

    async create(data: Channel, user: User) {
        const channel = new Channel();
        channel._id = new mongoose.Types.ObjectId(data._id);
        channel.name = data.name;
        channel.purpose = data.purpose;
        channel.private = data.private;
        channel.createdBy = user._id;
        channel.members = [user._id];
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

    async addMembers(id: string, data: string[], user: IUser) {
        const channel: Channel = await this.channelRepository.findById(id);
        try {
            if (channel.createdBy.toString() === user._id) {
                const newData = {
                    members: [
                        ...channel.members,
                        ...data.map((id) => new mongoose.Types.ObjectId(id))
                    ]
                };

                return await this.channelRepository.findOneAndUpdate(
                    { _id: channel._id },
                    newData
                );
            } else {
                throw new Error(HttpErrorCode.INVALID_PERMISSIONS);
            }
        } catch (error) {
            throw error;
        }
    }

    async getFavorites(user: IUser) {
        try {
            return await (
                await this.userRepository.findById(user._id)
            ).favoriteChannels;
        } catch (error) {
            throw error;
        }
    }
}
