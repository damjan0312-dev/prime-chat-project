import { Channel } from 'src/chat/channel/channel.schema';

export interface IUser {
    _id?: string;
    fullname: string;
    username: string;
    email: string;
    password?: string;
    phoneNumber?: string;
    timeZone?: string;
    occupation?: string;
    role: UserRole;
    createdAt?: Date;
    updatedAt?: Date;
    channels: Array<Channel>;
    createdChannels: Array<Channel>;
    favoriteChannels: Array<Channel>;
}

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user'
}
