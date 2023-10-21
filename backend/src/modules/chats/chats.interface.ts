import { Field, ObjectType } from '@nestjs/graphql';

import { UserResponse } from '../users/users.interface';

@ObjectType()
export class ChatResponse {
  @Field(() => String)
  chat_id: number;

  @Field(() => [UserResponse])
  users?: UserResponse[];
}

@ObjectType()
export class DeleteChatResponse {
  @Field(() => Boolean)
  status: boolean;
}
