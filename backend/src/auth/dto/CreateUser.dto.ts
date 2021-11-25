import { UserRole } from './../../users/interface/user.interface';
import {
    IsEmail,
    IsPhoneNumber,
    IsString,
    Matches,
    MaxLength,
    MinLength
} from 'class-validator';

export class CreateUserDto {
    @IsString()
    readonly fullname: string;

    @MinLength(5, { message: 'Username is too short.' })
    @MaxLength(20, { message: 'Username is too long.' })
    readonly username: string;

    @IsEmail()
    readonly email: string;

    @MinLength(6, { message: 'Password is too short, minimum length is 6.' })
    @MaxLength(20, { message: 'Password is too long, maximum length is 20.' })
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
        message:
            'The password must contain at least one letter, one number and one special character.'
    })
    readonly password: string;

    @IsPhoneNumber()
    readonly phoneNumber: string;

    readonly timeZone: string;
    readonly role: UserRole;
}
