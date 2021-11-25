import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ChannelModule } from './chat/channel/channel.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.DATABASE_CONNECTION),
        UsersModule,
        AuthModule,
        ChannelModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
