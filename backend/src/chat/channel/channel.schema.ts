import { IUser } from '../../users/interface/user.interface';
import { UserSchema, User } from './../../users/schema/user.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Type } from 'class-transformer';

export type ChannelDocument = Channel & Document;

@Schema({ _id: false })
export class Channel {
    @Prop({ type: mongoose.Types.ObjectId })
    _id: mongoose.Types.ObjectId;

    @Prop({ required: true, length: 24 })
    name: string;

    @Prop({ required: true, length: 128, nullable: true })
    purpose: string;

    @Prop({ required: true, default: true })
    private: boolean;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'USER' })
    createdBy: mongoose.Types.ObjectId;

    // @Prop({ type: UserSchema, default: [] })
    // @Type(() => User)
    // users: User[];

    @Prop({ default: Date.now() })
    createdAt: Date;

    @Prop({ default: Date.now() })
    updatedAt: Date;
}

export const ChannelSchema = SchemaFactory.createForClass(Channel);
