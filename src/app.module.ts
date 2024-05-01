import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configLocal from './config/config.local';
import configDevelopment from './config/config.development';
import configProduction from './config/config.production';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentModule } from './payment/payment.module';

let config;
switch (process.env.NODE_ENV) {
    case 'production':
        config = configProduction;
        break;
    case 'development':
        config = configDevelopment;
        break;
    default:
        config = configLocal;
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
                // TODO : config/config.development.ts 파일에 type 생성 후, object 타입 변경 예정
                configService.get<object>('config-info.database.mysql'),
            inject: [ConfigService]
        }),
        PaymentModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
