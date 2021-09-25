import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/CreateUser.dto';
import { IUser } from '../../users/interface/user.interface';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcryptjs';
import { AuthRepository } from '../repositories/auth.repository';

@Injectable()
export class AuthService {
    constructor(
        private authRepository: AuthRepository,
        private jwtService: JwtService
    ) {}

    async signUp(createUserDto: CreateUserDto): Promise<IUser> {
        try {
            return await this.authRepository.create(createUserDto);
        } catch (error) {
            if (error.code === 11000) {
                throw new ConflictException('User already exists');
            }
            throw error;
        }
    }

    async signIn(user: IUser) {
        const payload = { username: user.username, sub: user._id };

        return {
            accessToken: this.jwtService.sign(payload)
        };
    }

    async validateUser(username: string, pass: string): Promise<IUser> {
        const user = await this.authRepository.findOne({ username });

        if (!user) {
            return null;
        }

        const valid = await bcrypt.compare(pass, user.password);

        if (valid) {
            return user;
        }

        return null;
    }
}
