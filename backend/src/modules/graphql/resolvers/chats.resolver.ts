import { UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateChatAction } from '../../../core/command-bus/actions/create-chat.action';
import { DropChatAction } from '../../../core/command-bus/actions/drop-chat.action';
import { GetUser } from '../../../decorators/get-user.decorator';
import { JwtPayload } from '../../auth/auth.service';
import { GqlAuthGuard } from '../../auth/guards/jwt.guard';
import { ChatResponse, DeleteChatResponse } from '../../chats/chats.interface';
import { Chat } from '../../chats/chats.repository';

@Resolver()
export class ChatsResolver {
  constructor(private readonly commandBus: CommandBus) {}

  @Query(() => String)
  getChats(): string {
    return 'Hello World!';
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => ChatResponse)
  async createChat(@Args('receiverId', { type: () => String }) receiverId: string, @GetUser() { user_id }: JwtPayload) {
    return this.commandBus.execute(new CreateChatAction(user_id, receiverId));
  }
  @UseGuards(GqlAuthGuard)
  @Mutation(() => DeleteChatResponse)
  async dropChat(@Args('chat_id', { type: () => String }) chatId: Chat['chat_id'], @GetUser() { user_id }: JwtPayload) {
    return this.commandBus.execute(new DropChatAction(chatId, user_id));
  }
  // @Mutation(() => RegisterResponse)
  // async register(@Args() data: Register) {
  //   try {
  //     RegisterSchema.parse(data);
  //     return this.commandBus.execute(new RegisterAction(data.nickname, data.password));
  //   } catch (e) {
  //     if (e instanceof ZodError) {
  //       throw ErrorHandler(HttpStatus.UNPROCESSABLE_ENTITY, ERROR_MESSAGES.ZOD_ERROR(e));
  //     }
  //   }
  // }
}
