import { HttpStatus } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ERROR_MESSAGES, ErrorHandler } from '../../../helpers/error.handler';
import { AuthService } from '../../../modules/auth/auth.service';
import { LoginResponse } from '../../../modules/users/users.interface';
import { User } from '../../../modules/users/users.repository';
import { UsersService } from '../../../modules/users/users.service';

export class LoginAction {
  constructor(public readonly nickname: User['nickname'], public readonly password: User['password']) {}
}

@CommandHandler(LoginAction)
export class LoginHandler implements ICommandHandler<LoginAction> {
  constructor(private readonly userService: UsersService, private readonly authService: AuthService) {}

  async execute(userInfo: LoginAction): Promise<LoginResponse> {
    const user = await this.userService.find({
      where: { nickname: userInfo.nickname },
    });
    const isPasswordValid = this.authService.comparePasswords(userInfo.password, user.password);
    if (!isPasswordValid) {
      throw ErrorHandler(HttpStatus.FORBIDDEN, ERROR_MESSAGES.WRONG_PASSWORD);
    }
    const { access_token, refresh_token } = await this.authService.generateTokens(user.user_id);
    await this.userService.update({ user_id: user.user_id, refresh_token });
    return { access_token, refresh_token };
  }
}
