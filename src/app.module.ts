import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import localConfig from './config/local/local.config';
import developmentConfig from './config/development/development.config';
import productionConfig from './config/production/production.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentModule } from './payment/payment.module';
import { LoggerMiddleware } from './logger/logger.middleware';

let config;
switch (process.env.NODE_ENV) {
    case 'production':
        config = productionConfig;
        break;
    case 'development':
        config = developmentConfig;
        break;
    default:
        config = localConfig;
        break;
}

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            cache: true,
            load: [config]
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) =>
                // TODO : config/development.config.ts 파일에 type 생성 후, object 타입 변경 예정
                configService.get<object>('config-info.database.mysql'),
            inject: [ConfigService]
        }),
        PaymentModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): any {
        consumer.apply(LoggerMiddleware).forRoutes('*');
    }
}
