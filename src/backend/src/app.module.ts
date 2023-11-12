import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommandBusModule } from './core/command-bus/command-bus.module';
import { ChatsModule } from './modules/chats/chats.module';
import { Chat } from './modules/chats/chats.repository';
import { GraphqlModule } from './modules/graphql/graphql.module';
import { Message } from './modules/messages/messages.repository';
import { User } from './modules/users/users.repository';

@Module({
  imports: [
    CqrsModule,
    CommandBusModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow('POSTGRES_HOST'),
        port: configService.getOrThrow('POSTGRES_PORT'),
        database: configService.getOrThrow('POSTGRES_DB'),
        username: configService.getOrThrow('POSTGRES_USER'),
        password: configService.getOrThrow('POSTGRES_PASSWORD'),
        entities: [Message, Chat, User],
        synchronize: true,
        logging: true,
      }),
      inject: [ConfigService],
    }),

    ChatsModule,
    GraphqlModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
