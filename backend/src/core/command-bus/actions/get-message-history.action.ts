import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Chat } from '../../../modules/chats/chats.repository';
import { MessageResponse } from '../../../modules/messages/messages.interface';
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
  constructor(private readonly messageService: MessagesService) {}

  async execute({ chat_id, limit, offset }: GetMessageHistoryAction): Promise<MessageResponse[]> {
    return this.messageService.getMessages(chat_id, { limit, offset });
  }
}
