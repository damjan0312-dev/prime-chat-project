import { IChannel } from 'src/chat/channel/channel.interface';

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
    channels: Array<IChannel>;
    createdChannels: Array<IChannel>;
    favoriteChannels: Array<IChannel>;
}

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user'
}
