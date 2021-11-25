import { IUser } from 'src/users/interface/user.interface';
import { User } from './../schema/user.schema';
import { UserRepository } from './../repositories/user.repository';
import { Injectable } from '@nestjs/common';

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
}
