import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Chat } from './chats.repository';

import { User } from '../users/users.repository';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Chat)
    public readonly chatRepository: Repository<Chat>,
  ) {}

  async createChat(userId: User['user_id'], receiverId: User['user_id']) {
    return this.chatRepository.save({ users: [{ user_id: userId }, { user_id: receiverId }] });
  }

  async dropChat(chat_id: Chat['chat_id']) {
    await this.chatRepository.delete({ chat_id });
    return;
  }
}
