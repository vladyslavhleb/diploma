import { HttpStatus } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ERROR_MESSAGES, ErrorHandler } from '../../../helpers/error.handler';
import { AuthService, JwtPayload } from '../../../modules/auth/auth.service';
import { LoginResponse } from '../../../modules/users/users.interface';
import { User } from '../../../modules/users/users.repository';
import { UsersService } from '../../../modules/users/users.service';

export class RefreshTokenAction {
  constructor(public readonly access_token: string, public readonly refresh_token: User['refresh_token']) {}
}

@CommandHandler(RefreshTokenAction)
export class RefreshTokenHandler implements ICommandHandler<RefreshTokenAction> {
  constructor(private readonly userService: UsersService, private readonly authService: AuthService) {}

  async execute(tokens: RefreshTokenAction): Promise<LoginResponse> {
    const payload: JwtPayload = await this.authService.verifyExpired(tokens.access_token);
    const user = await this.userService.find({
      where: { user_id: payload.user_id },
    });
    if (!user) {
      throw ErrorHandler(HttpStatus.NOT_FOUND, ERROR_MESSAGES.NOT_FOUND('user'));
    }

    if (user.refresh_token !== tokens.refresh_token) {
      throw ErrorHandler(HttpStatus.FORBIDDEN, ERROR_MESSAGES.INVALID_TOKEN);
    }

    const { access_token, refresh_token } = await this.authService.generateTokens(user.user_id);
    await this.userService.update({ user_id: user.user_id, refresh_token });
    return { access_token, refresh_token };
  }
}
