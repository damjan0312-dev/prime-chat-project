import { IUser } from '../../users/interface/user.interface';

export class IChannel {
    readonly name: string;
    readonly private: boolean;
    readonly purpose: string;
    readonly createdBy: IUser;
}
