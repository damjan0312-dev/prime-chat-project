import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Patch,
    UseFilters,
    UseGuards
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { HttpExceptionFilter } from 'src/utils/exceptions/http-exception.filter';
import { ErrorBuilder } from '../../utils/exceptions/exception.builder';
import { User } from '../schema/user.schema';
import { UsersService } from './../service/users.service';

@Controller('users')
@UseFilters(new HttpExceptionFilter())
@UseGuards(JwtAuthGuard)
export class UsersController {
    constructor(private userService: UsersService) {}
    @Get()
    async findAll(): Promise<User[]> {
        try {
            return await this.userService.findAll();
        } catch (error) {
            throw ErrorBuilder(HttpStatus.NOT_FOUND, 'User not found.');
        }
    }
    @Get(':id')
    async findOne(@Param() params): Promise<User> {
        try {
            return await this.userService.findOne(params.id);
        } catch (error) {
            throw ErrorBuilder(HttpStatus.NOT_FOUND, 'User not found.');
        }
    }

    @Delete(':id')
    async removeById(@Param() params): Promise<Boolean> {
        try {
            return await this.userService.removeById(params.id);
        } catch (error) {
            throw ErrorBuilder(HttpStatus.NOT_FOUND, 'User not found.');
        }
    }

    @Patch(':id')
    async updateUser(@Param() params, @Body() body): Promise<User> {
        try {
            return await this.userService.update(params.id, body);
        } catch (error) {
            throw ErrorBuilder(HttpStatus.NOT_FOUND, 'User not found.');
        }
    }

    @Get(':id/favorites')
    async getFavorites(@Param() params) {
        try {
            return await this.userService.getFavorites(params.id);
        } catch (error) {
            throw ErrorBuilder(HttpStatus.NOT_FOUND, 'User not found.');
        }
    }

    @Get(':id/created')
    async getCreatedByUserChannels(@Param() param) {
        return await this.userService.getCreatedByUserChannels(param.id);
    }
}
