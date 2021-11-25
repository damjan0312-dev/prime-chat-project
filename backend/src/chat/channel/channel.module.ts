import { ChannelRepository } from './channel.repository';
import { ChannelController } from './channel.controller';
import { ChannelService } from './channel.service';
import { ChannelSchema } from './channel.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../../users/users.module';

@Module({
    imports: [
        UsersModule,
        MongooseModule.forFeature([{ name: 'CHANNEL', schema: ChannelSchema }])
    ],
    providers: [ChannelRepository, ChannelService],
    controllers: [ChannelController]
})
export class ChannelModule {}
