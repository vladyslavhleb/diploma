import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Chat } from '../chats/chats.repository';
import { User } from '../users/users.repository';

@Entity({ name: 'messages', orderBy: { created_at: 'DESC' } })
export class Message {
  @PrimaryGeneratedColumn('uuid')
  message_id: string;

  @Column()
  payload: string;

  @ManyToOne(() => User, (user) => user.messages)
  sender: User;

  @ManyToOne(() => Chat, (chat) => chat.messages)
  chat: Chat;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  created_at: Date;
}
