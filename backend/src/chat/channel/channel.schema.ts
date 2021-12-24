import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export type ChannelDocument = Channel & Document;

@Schema({
    _id: false,
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
})
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

    @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'USER', default: [] })
    members: mongoose.Types.ObjectId[];
}

export const ChannelSchema = SchemaFactory.createForClass(Channel);
