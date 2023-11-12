import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { GraphQLModule } from '@nestjs/graphql';

import { ChatsResolver } from './resolvers/chats.resolver';
import { MessagesResolver } from './resolvers/messages.resolver';
import { UsersResolver } from './resolvers/users.resolver';

import { CommandBusModule } from '../../core/command-bus/command-bus.module';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    CommandBusModule,
    AuthModule,
    UsersModule,
    CqrsModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',
    }),
  ],
  providers: [UsersResolver, MessagesResolver, ChatsResolver],
})
export class GraphqlModule {}
