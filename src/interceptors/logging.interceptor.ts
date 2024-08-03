import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request, Response } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    private readonly logger = new Logger(LoggingInterceptor.name);

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request: Request = context.switchToHttp().getRequest();
        const response: Response = context.switchToHttp().getResponse();

        const responseStatus = response.statusCode;

        const { method, url, body } = request;

        this.logger.log(
            `Received call at ${method} ${url} with body: ${JSON.stringify(body)}`,
        );

        const now = Date.now();

        return next
            .handle()
            .pipe(
                tap(() =>
                    this.logger.log(
                        `Responded with status ${responseStatus} in ${Date.now() - now}ms`,
                    ),
                ),
            );
    }
}
