import { UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateMessageAction } from '../../../core/command-bus/actions/create-message.action';
import { GetMessageHistoryAction } from '../../../core/command-bus/actions/get-message-history.action';
import { GetUser } from '../../../decorators/get-user.decorator';
import { JwtPayload } from '../../auth/auth.service';
import { GqlAuthGuard } from '../../auth/guards/jwt.guard';
import {
  GetMessageHistory,
  MessageResponseForHistory,
  MessagesHistoryResponse,
  SendMessage,
} from '../../messages/messages.interface';

@Resolver()
export class MessagesResolver {
  constructor(private readonly commandBus: CommandBus) {}

  @Query(() => String)
  getChats(): string {
    return 'Hello World!';
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => MessagesHistoryResponse)
  async getMessageHistory(@Args() { chat_id, limit, offset }: GetMessageHistory) {
    if (chat_id === '0') {
      return { chat: { chat_id: '0' }, history: [] };
    }
    const res = await this.commandBus.execute(new GetMessageHistoryAction(chat_id, limit, offset));
    console.log(res);
    return res;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => MessageResponseForHistory)
  async sendMessage(@Args() { chat_id, payload }: SendMessage, @GetUser() { user_id }: JwtPayload) {
    return this.commandBus.execute(new CreateMessageAction(payload, chat_id, user_id));
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
