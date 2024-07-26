import { HttpStatus } from '@nestjs/common';

const CoreResponseConstants = {
    PASS: {
        STATUS: HttpStatus.OK,
        CODE: 'SUCCESS',
        MESSAGE: 'Succefully Completed the request.',
    },
    FAILURE: {
        STATUS: HttpStatus.INTERNAL_SERVER_ERROR,
        CODE: 'FAILURE',
        MESSAGE: 'Exception Occured.',
    },
    UNAUTHORIZED: {
        STATUS: HttpStatus.UNAUTHORIZED,
        CODE: 'UNAUTHORIZED',
        MESSAGE: 'Unauthorized.',
    },
    BAD_REQUEST: {
        STATUS: HttpStatus.BAD_REQUEST,
        CODE: 'BAD_REQUEST',
        MESSAGE: 'Validation Exception.',
    },
    FORBIDDEN_RESOURCE: {
        STATUS: HttpStatus.FORBIDDEN,
        CODE: 'FORBIDDEN_RESOURCE',
        MESSAGE: 'Forbidden resource.',
    },
    UNPROCESSABLE_ENTITY: {
        STATUS: HttpStatus.UNPROCESSABLE_ENTITY,
        CODE: 'UNPROCESSABLE_ENTITY',
        MESSAGE: 'Unprocessable entity.',
    },
    NOT_FOUND: {
        STATUS: HttpStatus.NOT_FOUND,
        CODE: 'NOT_FOUND',
        MESSAGE: 'Resource not found.',
    },
};

export const CONSTANTS = {
    ENV: {
        PRODUCTION: 'production',
    },

    RESPONSE: { ...CoreResponseConstants },
};
