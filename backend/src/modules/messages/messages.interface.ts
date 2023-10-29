import { ArgsType, Field, ObjectType } from '@nestjs/graphql';

import { Message } from './messages.repository';

import { ChatResponse } from '../chats/chats.interface';
import { Chat } from '../chats/chats.repository';
import { UserResponse } from '../users/users.interface';

@ObjectType()
export class MessageResponse {
  @Field(() => String)
  message_id: string;

  @Field(() => String)
  payload: string;

  @Field(() => UserResponse, { nullable: true })
  sender: UserResponse;

  @Field(() => ChatResponse, { nullable: true })
  chat: ChatResponse;

  @Field(() => Date)
  created_at: Date;
}

@ArgsType()
export class GetMessageHistory {
  @Field(() => Number)
  limit: number;

  @Field(() => Number)
  offset: number;

  @Field(() => String)
  chat_id: string;
}

@ArgsType()
export class SendMessage {
  @Field(() => String)
  chat_id: Chat['chat_id'];

  @Field(() => String)
  payload: Message['payload'];
}
