import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouterModule } from '@nestjs/core';
import { AllEntities } from 'src/constant/database/model';
import { getDataSourceOptions } from './data-source';
// import { ConfigModule } from './config/config.module';
// import { ConfigService } from '@nestjs/config';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { APIModule } from 'src/route/api/api.module';
import { APIRoutes } from 'src/route/api/api.route';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature(AllEntities),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => getDataSourceOptions(configService),
      inject: [ConfigService],
    }),
    RouterModule.register([
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
