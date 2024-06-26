import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ActionTokensModule } from './action-tokens/action-tokens.module';
import { ShopModule } from './shop/shop.module';
import { AquariumModule } from './aquarium/aquarium.module';
import { TaskManagerModule } from './task-manager/task-manager.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      envFilePath: '.env',
      expandVariables: true,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [`${__dirname}/**/*.entity{.ts,.js}`],
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    ShopModule,
    AquariumModule,
    TaskManagerModule,
    ActionTokensModule,
    ScheduleModule.forRoot(),
  ],
})
export class AppModule {}
