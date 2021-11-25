import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { UserRole } from '../interface/user.interface';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({ required: true })
    fullname: string;

    @Prop({ required: true, unique: true })
    username: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ type: 'string', enum: UserRole, default: UserRole.USER })
    role: UserRole;

    @Prop({ default: null })
    phoneNumber: string;

    @Prop({ default: null })
    timeZone: string;

    @Prop({ default: null })
    occupation: string;

    @Prop({ default: Date.now() })
    createdAt: Date;

    @Prop({ default: null })
    updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<User>('save', function (next: Function) {
    const user = this;
    if (user.password) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) return next(err);

            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) return next(err);

                user.password = hash;
                next();
            });
        });
    }
});
