import { User } from './../schema/user.schema';
import { UserRepository } from './../repositories/user.repository';
import { CreateUserDto } from '../../auth/dto/CreateUser.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    constructor(private userRepository: UserRepository) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        return await this.userRepository.create(createUserDto);
    }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find({});
    }

    async findOne(id: string): Promise<User> {
        return await this.userRepository.findOne({ id });
    }

    async removeById(id: string): Promise<Boolean> {
        return await this.userRepository.deleteMany({ id });
    }
}
