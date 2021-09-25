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
}

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user'
}
