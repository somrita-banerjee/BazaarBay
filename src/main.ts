import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
    BadRequestException,
    HttpStatus,
    INestApplication,
    Logger,
    LogLevel,
    ValidationError,
    ValidationPipe,
} from '@nestjs/common';
import { CONSTANTS } from './config/configs.constants';
import { ConfigsSchema } from './config/configs.schema';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// loglevel - returns loglevels based on system environment == prpduction
/**
 * @description returns loglevels based on system environment == prpduction
 * @returns array of loglevel
 */
const _getLogLevels = (): LogLevel[] => {
    const isIAmProd = process.env.SYSTEM_NODE_ENV === CONSTANTS.ENV.PRODUCTION;

    if (isIAmProd) {
        return ['log', 'warn', 'error'];
    }

    return ['error', 'warn', 'log', 'verbose', 'debug', 'fatal'];
};

/**
 * @description extract instances from app like config service
 * @param app
 * @returns
 */
const _getHelpersFromINestApp = (
    app: INestApplication,
): { configService: ConfigService; logger: Logger; isIAmProd: boolean } => {
    const configService = app.get(ConfigService);

    const isIAmProd = configService.get<boolean>('SYSTEM.IS_PROD');

    const logger = new Logger('Main.ts');

    return {
        configService,
        isIAmProd,
        logger,
    };
};

/**
 * @description logger.debug configuration variables
 * @param app
 */
const _printEnvVariables = (app: INestApplication) => {
    const { logger, isIAmProd } = _getHelpersFromINestApp(app);

    if (!isIAmProd)
        logger.debug(
            `Final Loaded Config: ${JSON.stringify(ConfigsSchema(), null, 2)}`,
        );
};

/**
 * @description configure swagger
 * @param app
 */
const _configureSwagger = (app: INestApplication) => {
    const config = new DocumentBuilder()
        .setTitle('BazaarBay API Documentation')
        .setVersion('1.0')
        .addTag('Auth')
        .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api-docs', app, document);
};

/**
 *
 * @param app
 */
const _configureServer = async (app: INestApplication) => {
    const { logger, configService } = _getHelpersFromINestApp(app);

    const port = configService.get<number>('SYSTEM.PORT');

    app
        // .useGlobalInterceptors(new HttpLoggingInterceptor(configService))
        // .useGlobalFilters(new HttpExceptionFilter())
        .useGlobalPipes(
            new ValidationPipe({
                forbidUnknownValues: true,
                forbidNonWhitelisted: true,
                whitelist: true,
                transform: true,
                exceptionFactory(validationErrors: ValidationError[] = []) {
                    logger.error(
                        validationErrors.map((ve) => ve.toString()).join('\n'),
                    );

                    return new BadRequestException({
                        status: HttpStatus.BAD_REQUEST,
                        code: CONSTANTS.RESPONSE.BAD_REQUEST.CODE,
                        message: CONSTANTS.RESPONSE.BAD_REQUEST.MESSAGE,
                        errors: validationErrors,
                    });
                },
            }),
        )
        .enableShutdownHooks()
        .use(helmet())
        .use(cookieParser())
        .enableCors({
            exposedHeaders: ['Content-Disposition'],
        });

    await _configureSwagger(app);

    await app.listen(port);

    logger.log(`Server started at ${port}`);
};

/**
 * @description builds the app from scratch
 */
async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: _getLogLevels(),
    });

    _printEnvVariables(app);
    await _configureServer(app);
}

bootstrap();

