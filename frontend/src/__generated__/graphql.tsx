import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: any; output: any };
};

export type ChatResponse = {
  __typename?: 'ChatResponse';
  chat_id: Scalars['String']['output'];
  users: Array<UserResponse>;
};

export type DeleteChatResponse = {
  __typename?: 'DeleteChatResponse';
  status: Scalars['Boolean']['output'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  access_token: Scalars['String']['output'];
  refresh_token: Scalars['String']['output'];
};

export type MessageResponse = {
  __typename?: 'MessageResponse';
  chat?: Maybe<ChatResponse>;
  created_at: Scalars['DateTime']['output'];
  message_id: Scalars['String']['output'];
  payload: Scalars['String']['output'];
  sender?: Maybe<UserResponse>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createChat: ChatResponse;
  dropChat: DeleteChatResponse;
  login: LoginResponse;
  refreshToken: LoginResponse;
  register: RegisterResponse;
  sendMessage: MessageResponse;
};

export type MutationCreateChatArgs = {
  receiverId: Scalars['String']['input'];
};

export type MutationDropChatArgs = {
  chat_id: Scalars['String']['input'];
};

export type MutationLoginArgs = {
  nickname: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type MutationRefreshTokenArgs = {
  refreshToken: Scalars['String']['input'];
};

export type MutationRegisterArgs = {
  nickname: Scalars['String']['input'];
  password: Scalars['String']['input'];
  public_key: Scalars['String']['input'];
};

export type MutationSendMessageArgs = {
  chat_id: Scalars['String']['input'];
  payload: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  getChats: Scalars['String']['output'];
  getMessageHistory: Array<MessageResponse>;
  getUser: UserResponse;
};

export type QueryGetMessageHistoryArgs = {
  chat_id: Scalars['String']['input'];
  limit: Scalars['Float']['input'];
  offset: Scalars['Float']['input'];
};

export type RegisterResponse = {
  __typename?: 'RegisterResponse';
  access_token: Scalars['String']['output'];
  refresh_token: Scalars['String']['output'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  chats?: Maybe<Array<ChatResponse>>;
  nickname: Scalars['String']['output'];
  user_id: Scalars['String']['output'];
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  ChatResponse: ResolverTypeWrapper<ChatResponse>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  DeleteChatResponse: ResolverTypeWrapper<DeleteChatResponse>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  LoginResponse: ResolverTypeWrapper<LoginResponse>;
  MessageResponse: ResolverTypeWrapper<MessageResponse>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  RegisterResponse: ResolverTypeWrapper<RegisterResponse>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  UserResponse: ResolverTypeWrapper<UserResponse>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  ChatResponse: ChatResponse;
  DateTime: Scalars['DateTime']['output'];
  DeleteChatResponse: DeleteChatResponse;
  Float: Scalars['Float']['output'];
  LoginResponse: LoginResponse;
  MessageResponse: MessageResponse;
  Mutation: {};
  Query: {};
  RegisterResponse: RegisterResponse;
  String: Scalars['String']['output'];
  UserResponse: UserResponse;
};

export type ChatResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ChatResponse'] = ResolversParentTypes['ChatResponse'],
> = {
  chat_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  users?: Resolver<Array<ResolversTypes['UserResponse']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type DeleteChatResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['DeleteChatResponse'] = ResolversParentTypes['DeleteChatResponse'],
> = {
  status?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LoginResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['LoginResponse'] = ResolversParentTypes['LoginResponse'],
> = {
  access_token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  refresh_token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MessageResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['MessageResponse'] = ResolversParentTypes['MessageResponse'],
> = {
  chat?: Resolver<Maybe<ResolversTypes['ChatResponse']>, ParentType, ContextType>;
  created_at?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  message_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  payload?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sender?: Resolver<Maybe<ResolversTypes['UserResponse']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation'],
> = {
  createChat?: Resolver<
    ResolversTypes['ChatResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateChatArgs, 'receiverId'>
  >;
  dropChat?: Resolver<
    ResolversTypes['DeleteChatResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationDropChatArgs, 'chat_id'>
  >;
  login?: Resolver<
    ResolversTypes['LoginResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationLoginArgs, 'nickname' | 'password'>
  >;
  refreshToken?: Resolver<
    ResolversTypes['LoginResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationRefreshTokenArgs, 'refreshToken'>
  >;
  register?: Resolver<
    ResolversTypes['RegisterResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationRegisterArgs, 'nickname' | 'password' | 'public_key'>
  >;
  sendMessage?: Resolver<
    ResolversTypes['MessageResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationSendMessageArgs, 'chat_id' | 'payload'>
  >;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query'],
> = {
  getChats?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  getMessageHistory?: Resolver<
    Array<ResolversTypes['MessageResponse']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetMessageHistoryArgs, 'chat_id' | 'limit' | 'offset'>
  >;
  getUser?: Resolver<ResolversTypes['UserResponse'], ParentType, ContextType>;
};

export type RegisterResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['RegisterResponse'] = ResolversParentTypes['RegisterResponse'],
> = {
  access_token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  refresh_token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['UserResponse'] = ResolversParentTypes['UserResponse'],
> = {
  chats?: Resolver<Maybe<Array<ResolversTypes['ChatResponse']>>, ParentType, ContextType>;
  nickname?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  ChatResponse?: ChatResponseResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  DeleteChatResponse?: DeleteChatResponseResolvers<ContextType>;
  LoginResponse?: LoginResponseResolvers<ContextType>;
  MessageResponse?: MessageResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RegisterResponse?: RegisterResponseResolvers<ContextType>;
  UserResponse?: UserResponseResolvers<ContextType>;
};
