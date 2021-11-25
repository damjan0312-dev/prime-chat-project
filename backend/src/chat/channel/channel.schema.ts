import { IUser } from '../../users/interface/user.interface';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type ChannelDocument = Channel & Document;

@Schema()
export class Channel {
    @Prop({ required: true, length: 24 })
    name: string;

    @Prop({ required: true, length: 128, nullable: true })
    purpose: string;

    @Prop({ required: true, default: true })
    private: boolean;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'USER' })
    createdBy: IUser;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'USER' })
    users: IUser[];

    @Prop({ required: true, default: Date.now() })
    createdAt: Date;

    @Prop({ required: true, default: Date.now() })
    updatedAt: Date;
}

export const ChannelSchema = SchemaFactory.createForClass(Channel);
