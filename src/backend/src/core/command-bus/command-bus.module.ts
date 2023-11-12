import { Module } from '@nestjs/common';

import { CreateChatHandler } from './actions/create-chat.action';
import { CreateMessageHandler } from './actions/create-message.action';
import { DropChatHandler } from './actions/drop-chat.action';
import { GetMessageHistoryHandler } from './actions/get-message-history.action';
import { GetUserHandler } from './actions/get-user.action';
import { LoginHandler } from './actions/login.action';
import { RefreshTokenHandler } from './actions/refresh-token.action';
import { RegisterHandler } from './actions/register.action';

import { AuthModule } from '../../modules/auth/auth.module';
import { ChatsModule } from '../../modules/chats/chats.module';
import { MessagesModule } from '../../modules/messages/messages.module';
import { UsersModule } from '../../modules/users/users.module';

const handlers = [
  RegisterHandler,
  LoginHandler,
  GetUserHandler,
  CreateMessageHandler,
  CreateChatHandler,
  DropChatHandler,
  RefreshTokenHandler,
  GetMessageHistoryHandler,
];

@Module({
  imports: [UsersModule, MessagesModule, AuthModule, ChatsModule, MessagesModule],
  providers: [...handlers],
  exports: [...handlers],
})
export class CommandBusModule {}
