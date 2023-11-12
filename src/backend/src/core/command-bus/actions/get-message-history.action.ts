import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Chat } from '../../../modules/chats/chats.repository';
import { ChatsService } from '../../../modules/chats/chats.service';
import { MessagesHistoryResponse } from '../../../modules/messages/messages.interface';
import { MessagesService } from '../../../modules/messages/messages.service';

export class GetMessageHistoryAction {
  constructor(
    public readonly chat_id: Chat['chat_id'],
    public readonly limit: number,
    public readonly offset: number,
  ) {}
}

@CommandHandler(GetMessageHistoryAction)
export class GetMessageHistoryHandler implements ICommandHandler<GetMessageHistoryAction> {
  constructor(private readonly messageService: MessagesService, private readonly chatService: ChatsService) {}

  async execute({ chat_id, limit, offset }: GetMessageHistoryAction): Promise<MessagesHistoryResponse> {
    const [chat, history] = await Promise.all([
      this.chatService.chatRepository.findOne({ where: { chat_id }, relations: { users: true } }),
      this.messageService.getMessages(chat_id, { limit, offset }),
    ]);
    return { chat, history };
  }
}
