import { IChannel } from './../../chat/channel/channel.interface';
import { HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from './../repositories/user.repository';
import { User } from './../schema/user.schema';
import { ErrorBuilder } from 'src/utils/exceptions/exception.builder';
import * as mongoose from 'mongoose';

@Injectable()
export class UsersService {
    constructor(private userRepository: UserRepository) {}

    async findAll(): Promise<User[]> {
        return await this.userRepository.find({}, { password: 0 });
    }

    async findOne(id: string): Promise<User> {
        return await this.userRepository.findOne({ id }, { password: 0 });
    }

    async removeById(id: string): Promise<Boolean> {
        return await this.userRepository.deleteMany({ id });
    }

    async update(id: string, body: User) {
        return await this.userRepository.findOneAndUpdate({ id }, body);
    }

    async updateCreatedChannels(id: string, channelId: string) {
        try {
            const user: User = await this.userRepository.findById(id);

            const newData = {
                createdChannels: [
                    ...user.createdChannels,
                    new mongoose.Types.ObjectId(channelId)
                ]
            };

            return await this.userRepository.findOneAndUpdate({ id }, newData);
        } catch (error) {
            throw ErrorBuilder(HttpStatus.NOT_FOUND, 'User not found.');
        }
    }

    async getFavorites(id: string) {
        try {
            return (await this.userRepository.findById(id, 'favoriteChannels'))
                .favoriteChannels;
        } catch (error) {
            throw error;
        }
    }

    async getCreatedByUserChannels(id: string) {
        try {
            return (await this.userRepository.findById(id, 'createdChannels'))
                .createdChannels;
        } catch (error) {}
    }
}
