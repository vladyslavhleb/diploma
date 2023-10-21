import { HttpStatus } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Field, ObjectType } from '@nestjs/graphql';

import { ERROR_MESSAGES, ErrorHandler } from '../../../helpers/error.handler';
import { AuthService } from '../../../modules/auth/auth.service';
import { User } from '../../../modules/users/users.repository';
import { UsersService } from '../../../modules/users/users.service';

@ObjectType()
export class RegisterResponse {
  @Field(() => String)
  access_token: string;

  @Field(() => String)
  refresh_token: string;
}

export class RegisterAction {
  constructor(public readonly nickname: User['nickname'], public readonly password: User['password']) {}
}

@CommandHandler(RegisterAction)
export class RegisterHandler implements ICommandHandler<RegisterAction> {
  constructor(private readonly userService: UsersService, private readonly authService: AuthService) {}

  async execute(userInfo: RegisterAction): Promise<RegisterResponse> {
    const hashedPassword = await this.authService.hashPassword(userInfo.password);

    const duplicated = await this.userService.find({ where: { nickname: userInfo.nickname } });
    if (duplicated) {
      throw ErrorHandler(HttpStatus.BAD_REQUEST, ERROR_MESSAGES.ALREADY_EXISTS);
    }

    const refreshToken = this.authService.createRefreshToken();

    const user = await this.userService.createUser({
      ...userInfo,
      password: hashedPassword,
      refresh_token: refreshToken,
      token_valid_from: new Date(new Date().getTime() - 1),
    });

    const token = await this.authService.sign({ user_id: user.user_id });

    return { access_token: token, refresh_token: refreshToken };
  }
}
