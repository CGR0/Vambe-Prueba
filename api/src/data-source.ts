import { DataSourceOptions, DataSource } from 'typeorm';
import { dbConfig } from './config/db';

export const AppDataSource = new DataSource({
  ...dbConfig,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: false,
} as DataSourceOptions);

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });
