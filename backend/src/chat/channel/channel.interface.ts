import { IUser } from '../../users/interface/user.interface';

export class IChannel {
    readonly _id: string;
    readonly name: string;
    readonly private: boolean;
    readonly purpose: string;
    readonly createdBy: IUser; // id of the user
    readonly members: IUser[];
}
