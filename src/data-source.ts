
import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { AllEntities } from './constant/database/model';
import { ConfigService } from '@nestjs/config';
import {
  PostgresConnectionOptions,
} from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { Environment } from './constant';


export const getDataSourceOptions = (
  configService?: ConfigService,
): DataSourceOptions => {

  const baseProps: Partial<DataSourceOptions> = {
    type: 'postgres',
    synchronize: false,
    migrationsRun: true,
    entities: AllEntities,
    migrations: [__dirname + '/constant/database/migration/*{.ts,.js}'],
    subscribers: [],
    logging: true,
  };

  /* If it accessible by NestJS */
  if (configService) {
    return ({
      ...baseProps,
      host: configService.get<string>('DB_HOST'),
      port: +configService.get<string>('DB_PORT') | 5432,
      username: configService.get<string>('DB_USER'),
      password: configService.get<string>('DB_PASSWORD'),
      database: configService.get<string>('DB_NAME'),
      /* Enable logging only for lower level */
      logging: [
        Environment.LOCAL, Environment.LOCAL
      ].indexOf(configService.get<string>('env') as Environment) >= 0,
    }) as PostgresConnectionOptions;
  }

  /* loading environment variables if there's no configService */
  require('dotenv').config();

  /**
   * Returning for the direct command.
   * TODO: Try to use configModule by creating separate
   * module for database connection and all db process.
   * */
  return ({
    ...baseProps,
    host: process.env.DB_HOST, //process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER, // process.env.DB_USER,
    password: process.env.DB_PASSWORD, // process.env.DB_PASSWORD,
    database: process.env.DB_NAME, // process.env.DB_NAME,
  }) as PostgresConnectionOptions;
}

const dataSource = new DataSource(getDataSourceOptions());

export default dataSource;

// export default registerAs('database', () => ({
//   type: 'mysql',
//   host: process.env.DB_HOST || 'localhost',
//   port: process.env.DB_PORT || 3306,
//   username: process.env.DB_USER || 'root',
//   password: process.env.DB_PASSWORD || 'password',
//   database: process.env.DB_NAME || 'your_database_name',
//   entities: [AllEntities],
//   synchronize: process.env.DB_SYNC || false, // Set to true in development, false in production
// }));
