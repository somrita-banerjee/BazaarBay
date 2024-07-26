import {
    Global,
    Logger,
    Module,
    OnModuleDestroy,
    OnModuleInit,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigsSchema } from './configs.schema';
import { ConfigsValidation } from './configs.validation';

@Global()
@Module({
    exports: [ConfigModule],
    imports: [
        ConfigModule.forRoot({
            ignoreEnvFile: false,
            load: [ConfigsSchema],
            validationSchema: ConfigsValidation,
        }),
    ],
})
export class ConfigsModule implements OnModuleInit, OnModuleDestroy {
    private readonly className = ConfigsModule.name;
    private readonly logger = new Logger(this.className);

    onModuleInit() {
        this.logger.debug('module initiated');
    }
    onModuleDestroy() {
        this.logger.debug('Module destroyed');
    }
}
