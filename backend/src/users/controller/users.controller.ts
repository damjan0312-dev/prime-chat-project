import { UsersService } from './../service/users.service';
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    UseGuards
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from '../schema/user.schema';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
    constructor(private userService: UsersService) {}
    @Get()
    async findAll(): Promise<User[]> {
        return await this.userService.findAll();
    }
    @Get(':id')
    async findOne(@Param() params): Promise<User> {
        return await this.userService.findOne(params.id);
    }

    @Delete(':id')
    async removeById(@Param() params): Promise<Boolean> {
        return await this.userService.removeById(params.id);
    }
}
