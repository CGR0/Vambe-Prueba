import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { configLoader } from './config/config-loader';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LLMModule } from './llm/llm.module';
import { Client } from './client/client.entity';
import { ClientModule } from './client/client.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT as unknown as number,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [Client],

      synchronize: process.env.SYNCHRONIZE === 'true',
    }),
    ConfigModule.forRoot({
      load: [configLoader],
      isGlobal: true,
    }),
    LLMModule,
    ClientModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
