import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './service/users.service';
import { UsersController } from './controller/users.controller';
import { UserSchema } from './schema/user.schema';
import { UserRepository } from './repositories/user.repository';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'USER', schema: UserSchema }])
    ],
    providers: [UserRepository, UsersService],
    controllers: [UsersController]
})
export class UsersModule {}
