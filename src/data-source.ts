// src/database/data-source.ts
import { ConfigService } from '@nestjs/config';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { AllEntities } from './constant/database/model';

export const getDataSourceOptions = (
  configService: ConfigService,
): MysqlConnectionOptions => {
  // Use optional chaining to safely access the configuration value
  const port = configService.get<number>('DB_PORT');

  return {
    type: 'mysql',
    host: configService.get<string>('DB_HOST') || 'localhost',
    port: typeof port === 'number' ? port : 3306, // Use 3306 as a default if port is undefined or not a number
    username: configService.get<string>('DB_USER') || 'root',
    password: configService.get<string>('DB_PASSWORD') || 'root',
    database: configService.get<string>('DB_NAME') || 'ffmten',
    synchronize: true, // Set to false in production
    logging: true,
    entities: AllEntities,
    insecureAuth: true,
  };
};
