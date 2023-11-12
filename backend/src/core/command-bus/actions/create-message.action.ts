import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Chat } from '../../../modules/chats/chats.repository';
import { MessageResponseForHistory } from '../../../modules/messages/messages.interface';
import { Message } from '../../../modules/messages/messages.repository';
import { MessagesService } from '../../../modules/messages/messages.service';
import { User } from '../../../modules/users/users.repository';

export class CreateMessageAction {
  constructor(
    public readonly payload: Message['payload'],
    public readonly chat_id: Chat['chat_id'],
    public readonly sender: User['user_id'],
  ) {}
}

@CommandHandler(CreateMessageAction)
export class CreateMessageHandler implements ICommandHandler<CreateMessageAction> {
  constructor(private readonly messageService: MessagesService) {}

  async execute({ payload, sender, chat_id }: CreateMessageAction): Promise<MessageResponseForHistory> {
    return this.messageService.messageRepository.save({ payload, chat: { chat_id }, sender: { user_id: sender } });
  }
}
