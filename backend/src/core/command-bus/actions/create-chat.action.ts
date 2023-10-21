import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ChatResponse } from '../../../modules/chats/chats.interface';
import { ChatsService } from '../../../modules/chats/chats.service';
import { User } from '../../../modules/users/users.repository';

export class CreateChatAction {
  constructor(public readonly user_id: User['nickname'], public readonly receiverId: User['password']) {}
}

@CommandHandler(CreateChatAction)
export class CreateChatHandler implements ICommandHandler<CreateChatAction> {
  constructor(private readonly chatService: ChatsService) {}

  async execute(payload: CreateChatAction): Promise<ChatResponse> {
    return this.chatService.createChat(payload.user_id, payload.receiverId);
  }
}
