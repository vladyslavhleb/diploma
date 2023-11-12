import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Chat } from './chats.repository';
import { ChatsService } from './chats.service';

@Module({
  imports: [TypeOrmModule.forFeature([Chat])],
  providers: [ChatsService],
  exports: [ChatsService],
})
export class ChatsModule {}
