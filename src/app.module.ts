import { Logger, Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { ConfigsModule } from './config/configs.module';
import { MongooseModule, MongooseModuleFactoryOptions } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [
        ConfigsModule,
        // MongooseModule.forRootAsync({
        //     useFactory: async (
        //         configService: ConfigService,
        //     ): Promise<MongooseModuleFactoryOptions> => {
        //         const logger = new Logger(MongooseModule.name);

        //         const MONGO_CONNECTIONN_URL = configService.get<string>(
        //             'MONGO.CONNECTION_URL',
        //         );

        //         const options: MongooseModuleFactoryOptions = {
        //             uri: MONGO_CONNECTIONN_URL,
        //             connectionFactory: (connection) => {
        //                 connection.on('connected', () =>
        //                     logger.log('MongoDB connected..'),
        //                 );
        //                 connection.on('connecting', () =>
        //                     logger.log('MongoDB connecting..'),
        //                 );
        //                 connection.on('error', (error) =>
        //                     logger.error('MongoDB connection error:', error),
        //                 );
        //                 connection.on('disconnected', () =>
        //                     logger.debug('Disconnected from MongoDB'),
        //                 );
        //                 connection.on('disconnecting', () =>
        //                     logger.log('MongoDB disconnecting..'),
        //                 );
        //                 connection.on('reconnected', () =>
        //                     logger.log('MongoDB reconnected'),
        //                 );
        //                 connection.on('close', () =>
        //                     logger.log('MongoDB lost connection'),
        //                 );

        //                 return connection;
        //             },
        //         };

        //         logger.debug(
        //             `MongooseConfigModule configuration ${JSON.stringify(options, null, 2)}`,
        //         );

        //         return options;
        //     },
        //     inject: [ConfigService],
        // }),
        UserModule,
        ProductModule,
        OrderModule,
    ],
})
export class AppModule {}
