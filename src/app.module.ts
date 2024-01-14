// src/app.module.ts
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouterModule } from '@nestjs/core';
import { APIModule } from './../src/route/api/api.module';
import { APIRoutes } from 'src/route/api/api.route';
import { AllEntities } from 'src/constant/database/model';
import { getDataSourceOptions } from './data-source';
import { ConfigModule } from './config/config.module';
import { ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';

import { V1Module } from 'src/route/api/v1/v1.module';

@Module({
  imports: [
    TypeOrmModule.forFeature(AllEntities),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (
        configService: ConfigService,
      ) => getDataSourceOptions(configService),
      inject: [ConfigService],
    }),
    RouterModule.forRoot([
      {
        path: 'api',
        module: APIModule,
        children: APIRoutes,
      },
    ]),
    APIModule,
    ConfigModule,
  ],
})
export class AppModule {}
