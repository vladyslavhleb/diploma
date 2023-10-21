import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Message } from './messages.repository';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    public readonly messageRepository: Repository<Message>,
  ) {}

  async getMessages(chat_id, { limit, offset }: { limit: number; offset: number }) {
    return this.messageRepository.find({
      where: { chat: { chat_id } },
      skip: offset,
      take: limit,
      relations: { sender: true },
    });
  }
}
