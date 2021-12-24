import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    NotFoundException,
    Param,
    Patch,
    Post,
    Req,
    UseFilters,
    UseGuards
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Channel } from 'src/chat/channel/channel.schema';
import { HttpExceptionFilter } from 'src/utils/exceptions/http-exception.filter';
import { IChannel } from './channel.interface';
import { ChannelService } from './channel.service';

@Controller('channel')
@UseFilters(new HttpExceptionFilter())
@UseGuards(JwtAuthGuard)
export class ChannelController {
    constructor(private readonly channelService: ChannelService) {}

    @Post()
    async create(@Body() body: Channel, @Req() req) {
        return await this.channelService.create(body, req.user);
    }

    @Get()
    async findAll(@Req() req) {
        return await this.channelService.findAll(req);
    }

    // MOVE THIS TO USER CONTROLLER
    @Get('favorites')
    async getFavorites(@Req() req): Promise<IChannel[]> {
        try {
            return await this.channelService.getFavorites(req.user);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    @Get(':id')
    async findById(@Param() params) {
        try {
            return await this.channelService.findById(params.id.toString());
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.NOT_FOUND,
                    error: 'Channel Not Found 2'
                },
                HttpStatus.NOT_FOUND
            );
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
