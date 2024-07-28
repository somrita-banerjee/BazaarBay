import { Logger, Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { ConfigsModule } from './config/configs.module';
import { MongooseModule, MongooseModuleFactoryOptions } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        ConfigsModule,
        MongooseModule.forRootAsync({
            useFactory: async (
                configService: ConfigService,
            ): Promise<MongooseModuleFactoryOptions> => {
                const logger = new Logger(MongooseModule.name);

                const MONGO_URI = configService.get<string>('MONGO.URI');
                const MONGO_USER = configService.get<string>('MONGO.USER');
                const MONGO_PASS = configService.get<string>('MONGO.PASS');
                const MONGO_DB = configService.get<string>('MONGO.DB');

                const options: MongooseModuleFactoryOptions = {
                    uri: MONGO_URI,
                    pass: MONGO_PASS,
                    user: MONGO_USER,
                    dbName: MONGO_DB,

                    connectionFactory: (connection) => {
                        connection.on('connected', () =>
                            logger.debug('MongoDB connected..'),
                        );
                        connection.on('connecting', () =>
                            logger.debug('MongoDB connecting..'),
                        );
                        connection.on('error', (error) =>
                            logger.error('MongoDB connection error:', error),
                        );
                        connection.on('disconnected', () =>
                            logger.debug('Disconnected from MongoDB'),
                        );
                        connection.on('disconnecting', () =>
                            logger.debug('MongoDB disconnecting..'),
                        );
                        connection.on('reconnected', () =>
                            logger.debug('MongoDB reconnected'),
                        );
                        connection.on('close', () =>
                            logger.debug('MongoDB lost connection'),
                        );

                        return connection;
                    },
                };

                logger.debug(
                    `MongooseConfigModule configuration ${JSON.stringify(options, null, 2)}`,
                );

                return options;
            },
            inject: [ConfigService],
        }),
        UserModule,
        ProductModule,
        OrderModule,
        AuthModule,
    ],
})
export class AppModule {}
