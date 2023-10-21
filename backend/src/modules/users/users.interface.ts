import { ArgsType, Field, ObjectType } from '@nestjs/graphql';

import { ChatResponse } from '../chats/chats.interface';

@ArgsType()
export class Login {
  @Field(() => String)
  nickname: string;

  @Field(() => String)
  password: string;
}

@ArgsType()
export class RefreshToken {
  @Field(() => String)
  refreshToken: string;
}

@ArgsType()
export class Register {
  @Field(() => String)
  nickname: string;

  @Field(() => String)
  password: string;
}

@ObjectType()
export class RegisterResponse {
  @Field(() => String)
  access_token: string;

  @Field(() => String)
  refresh_token: string;
}

@ObjectType()
export class LoginResponse {
  @Field(() => String)
  access_token: string;

  @Field(() => String)
  refresh_token: string;
}

@ObjectType()
export class UserResponse {
  @Field(() => String)
  user_id: string;

  @Field(() => String)
  nickname: string;

  @Field(() => [ChatResponse], { nullable: true })
  chats?: ChatResponse[];
}
