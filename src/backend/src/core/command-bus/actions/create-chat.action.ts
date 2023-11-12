import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ChatResponse } from '../../../modules/chats/chats.interface';
import { ChatsService } from '../../../modules/chats/chats.service';
import { User } from '../../../modules/users/users.repository';
import { UsersService } from '../../../modules/users/users.service';

export class CreateChatAction {
  constructor(public readonly user_id: User['nickname'], public readonly receiverNickname: User['nickname']) {}
}

@CommandHandler(CreateChatAction)
export class CreateChatHandler implements ICommandHandler<CreateChatAction> {
  constructor(private readonly chatService: ChatsService, private readonly userService: UsersService) {}

  async execute({ user_id, receiverNickname }: CreateChatAction): Promise<ChatResponse> {
    const findUser = await this.userService.find({ where: { nickname: receiverNickname } });
    return this.chatService.createChat(user_id, findUser.user_id);
  }
}
