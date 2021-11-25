import {
    Controller,
    UseGuards,
    Post,
    Body,
    Req,
    Get,
    HttpStatus,
    InternalServerErrorException,
    Param,
    Patch,
    Delete,
    HttpCode
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { HttpErrorCode } from 'src/utils/enums/httpErrorCode.enum';
import { HttpExceptionCode } from 'src/utils/httpExceptionCode.utils';
import { IChannel } from './channel.interface';
import { ChannelService } from './channel.service';

@Controller('channel')
@UseGuards(JwtAuthGuard)
export class ChannelController {
    constructor(private readonly channelService: ChannelService) {}

    @Post()
    async create(@Body() body: IChannel, @Req() req) {
        return await this.channelService.create(body, req.user);
    }

    @Get()
    async findAll(@Req() req) {
        return await this.channelService.findAll(req);
    }

    // @Get(':id')
    // async findOne(@Param() params) {
    //     try {
    //         return await this.channelService.findOne(Number(params.id));
    //     } catch (error) {
    //         switch (error.message) {
    //             case HttpErrorCode.NOT_FOUND:
    //                 throw new HttpExceptionCode(
    //                     HttpStatus.NOT_FOUND,
    //                     HttpErrorCode.NOT_FOUND,
    //                     'Channel not found'
    //                 );
    //                 break;

    //             default:
    //                 throw new InternalServerErrorException();
    //         }
    //     }
    // }

    // @Patch(':id')
    // async update(@Param() params, @Body() body, @Req() req) {
    //     try {
    //         return await this.channelService.update(
    //             Number(params.id),
    //             body,
    //             req.user
    //         );
    //     } catch (error) {
    //         switch (error.message) {
    //             case HttpErrorCode.NOT_FOUND:
    //                 throw new HttpExceptionCode(
    //                     HttpStatus.NOT_FOUND,
    //                     HttpErrorCode.NOT_FOUND,
    //                     'Channel not found'
    //                 );
    //                 break;

    //             case HttpErrorCode.INVALID_PERMISSIONS:
    //                 throw new HttpExceptionCode(
    //                     HttpStatus.FORBIDDEN,
    //                     HttpErrorCode.INVALID_PERMISSIONS,
    //                     'Invalid permissions for resource'
    //                 );
    //                 break;

    //             default:
    //                 throw new InternalServerErrorException();
    //         }
    //     }
    // }

    // @Delete(':id')
    // @HttpCode(204)
    // async delete(@Param() params, @Req() req) {
    //     try {
    //         return await this.channelService.delete(
    //             Number(params.id),
    //             req.user
    //         );
    //     } catch (error) {
    //         switch (error.message) {
    //             case HttpErrorCode.NOT_FOUND:
    //                 throw new HttpExceptionCode(
    //                     HttpStatus.NOT_FOUND,
    //                     HttpErrorCode.NOT_FOUND,
    //                     'Channel not found'
    //                 );
    //                 break;

    //             case HttpErrorCode.INVALID_PERMISSIONS:
    //                 throw new HttpExceptionCode(
    //                     HttpStatus.FORBIDDEN,
    //                     HttpErrorCode.INVALID_PERMISSIONS,
    //                     'Invalid permissions for resource'
    //                 );
    //                 break;

    //             default:
    //                 throw new InternalServerErrorException();
    //         }
    //     }
    // }

    // @Patch(':id/favorite')
    // async favorite(@Param() params, @Req() req) {
    //     try {
    //         return await this.channelService.favorite(
    //             Number(params.id),
    //             req.user
    //         );
    //     } catch (error) {
    //         switch (error.message) {
    //             case HttpErrorCode.NOT_FOUND:
    //                 throw new HttpExceptionCode(
    //                     HttpStatus.NOT_FOUND,
    //                     HttpErrorCode.NOT_FOUND,
    //                     'Channel not found'
    //                 );
    //                 break;

    //             default:
    //                 throw new InternalServerErrorException();
    //         }
    //     }
    // }
}
