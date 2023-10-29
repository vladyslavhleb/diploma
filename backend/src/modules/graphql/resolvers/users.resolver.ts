import { ZodError } from 'zod';

import { HttpStatus, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { GetUserAction } from '../../../core/command-bus/actions/get-user.action';
import { LoginAction } from '../../../core/command-bus/actions/login.action';
import { RefreshTokenAction } from '../../../core/command-bus/actions/refresh-token.action';
import { RegisterAction, RegisterResponse } from '../../../core/command-bus/actions/register.action';
import { GetAccessToken } from '../../../decorators/get-access-token.decorator';
import { GetUser } from '../../../decorators/get-user.decorator';
import { ERROR_MESSAGES, ErrorHandler } from '../../../helpers/error.handler';
import { JwtPayload } from '../../auth/auth.service';
import { GqlAuthGuard } from '../../auth/guards/jwt.guard';
import { Login, LoginResponse, RefreshToken, Register, UserResponse } from '../../users/users.interface';
import { RegisterSchema } from '../validators/users.validator';

@Resolver()
export class UsersResolver {
  constructor(private readonly commandBus: CommandBus) {}

  @Mutation(() => LoginResponse)
  async login(@Args() data: Login) {
    return this.commandBus.execute(new LoginAction(data.nickname, data.password));
  }

  @Mutation(() => LoginResponse)
  async refreshToken(@Args() { refreshToken }: RefreshToken, @GetAccessToken() access_token: string) {
    return this.commandBus.execute(new RefreshTokenAction(access_token, refreshToken));
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => UserResponse)
  async getUser(@GetUser() data: JwtPayload) {
    return this.commandBus.execute(new GetUserAction(data.user_id));
  }
  @Mutation(() => RegisterResponse)
  async register(@Args() data: Register) {
    try {
      RegisterSchema.parse(data);
      return this.commandBus.execute(new RegisterAction(data.nickname, data.password, data.public_key));
    } catch (e) {
      if (e instanceof ZodError) {
        throw ErrorHandler(HttpStatus.UNPROCESSABLE_ENTITY, ERROR_MESSAGES.ZOD_ERROR(e));
      }
    }
  }
}
