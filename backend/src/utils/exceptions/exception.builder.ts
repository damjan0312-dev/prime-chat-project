import { HttpStatus, HttpException } from '@nestjs/common';

export const ErrorBuilder = (status: HttpStatus, message: string) => {
    return new HttpException(
        {
            status: status,
            error: message
        },
        status
    );
};
