import { HttpStatus } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ERROR_MESSAGES, ErrorHandler } from '../../../helpers/error.handler';
import { Chat } from '../../../modules/chats/chats.repository';
import { ChatsService } from '../../../modules/chats/chats.service';
import { User } from '../../../modules/users/users.repository';

export class DropChatAction {
  constructor(public readonly chat_id: Chat['chat_id'], public readonly user_id: User['user_id']) {}
}

@CommandHandler(DropChatAction)
export class DropChatHandler implements ICommandHandler<DropChatAction> {
  constructor(private readonly chatService: ChatsService) {}

  async execute({ chat_id, user_id }: DropChatAction) {
    const chat = await this.chatService.chatRepository.findOne({ where: { chat_id }, relations: { users: true } });

    if (!chat) {
      throw ErrorHandler(HttpStatus.NOT_FOUND, ERROR_MESSAGES.NOT_FOUND('chat'));
    }
    if (!chat.users.filter((user) => user.user_id === user_id).length) {
      throw ErrorHandler(HttpStatus.FORBIDDEN, ERROR_MESSAGES.FORBIDDEN('chat'));
    }
    await this.chatService.dropChat(chat_id);

    return { status: true };
  }
}
