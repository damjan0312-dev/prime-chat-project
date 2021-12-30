import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Patch,
    Post,
    Req,
    UseFilters,
    UseGuards
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Channel } from 'src/chat/channel/channel.schema';
import { ErrorBuilder } from 'src/utils/exceptions/exception.builder';
import { HttpExceptionFilter } from 'src/utils/exceptions/http-exception.filter';
import { UsersService } from './../../users/service/users.service';
import { ChannelService } from './channel.service';

@Controller('channel')
@UseFilters(new HttpExceptionFilter())
@UseGuards(JwtAuthGuard)
export class ChannelController {
    constructor(
        private readonly channelService: ChannelService,
        private readonly userService: UsersService
    ) {}

    @Post()
    async create(@Body() body: Channel, @Req() req) {
        try {
            const channel = await this.channelService.create(body, req.user);
            const updateUser = await this.userService.updateCreatedChannels(
                req.user._id,
                channel._id
            );

            if (channel && updateUser) {
                return channel;
            } else
                throw ErrorBuilder(
                    HttpStatus.FORBIDDEN,
                    'Invalid permissions.'
                );
        } catch (error) {
            throw ErrorBuilder(
                HttpStatus.CONFLICT,
                'Channel with that name already exists.'
            );
        }
    }

    @Get()
    async findAll(@Req() req) {
        return await this.channelService.findAll(req);
    }

    @Get(':id')
    async findById(@Param() params) {
        try {
            return await this.channelService.findById(params.id.toString());
        } catch (error) {
            throw ErrorBuilder(HttpStatus.NOT_FOUND, 'Channel not found.');
        }
    }

    @Patch(':id')
    async update(@Param() params, @Body() body, @Req() req) {
        try {
            return await this.channelService.update(params.id, body, req.user);
        } catch (error) {
            throw error;
        }
    }

    @Patch('/addMembers/:id')
    async addMembers(@Param() params, @Body() body: string[], @Req() req) {
        try {
            return await this.channelService.addMembers(
                params.id,
                body,
                req.user
            );
        } catch (error) {
            throw error;
        }
    }

    @Delete(':id')
    async delete(@Param() params, @Req() req) {
        try {
            return await this.channelService.delete(params.id, req.user);
        } catch (error) {
            throw error;
        }
    }
}
