import { InjectModel } from '@nestjs/mongoose';
import { ConflictException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/CreateUser.dto';
import { IUser } from '../../users/interface/user.interface';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel('USER') private userModel: Model<IUser>,
        private jwtService: JwtService
    ) {}

    async signUp(createUserDto: CreateUserDto): Promise<IUser> {
        const user = new this.userModel(createUserDto);

        try {
            return await user.save();
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
        const user = await this.userModel.findOne({ username });

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
