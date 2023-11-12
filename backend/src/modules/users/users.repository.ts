import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Chat } from '../chats/chats.repository';
import { Message } from '../messages/messages.repository';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  user_id: string;

  @Column({ length: 20 })
  nickname: string;

  @Column('text')
  password: string;

  @OneToMany(() => Message, (message) => message.chat)
  messages: Message[];

  @Column({ type: 'timestamptz' })
  token_valid_from: Date;

  @Column()
  refresh_token: string;

  @Column()
  public_key: string;

  @ManyToMany(() => Chat, (chat) => chat.users)
  @JoinTable({ name: 'users_chats' })
  chats: Chat[];

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  created_at?: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  updated_at?: Date;
}
