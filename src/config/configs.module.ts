import { Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configsSchema } from './configs.schema';
import { ConfigsValidation } from './configs.validation';

@Module({
  exports: [ConfigModule],
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: false,
      load: [configsSchema],
      validationSchema: ConfigsValidation,
    }),
  ],
})
export class ConfigsModule implements OnModuleInit, OnModuleDestroy {
  onModuleInit() {}
  onModuleDestroy() {}
}
