import { AuthenticationError } from '@nestjs/apollo';
import { CanActivate, ExecutionContext, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { ERROR_MESSAGES, ErrorHandler } from '../../../helpers/error.handler';
import { UsersService } from '../../users/users.service';
import { AuthService } from '../auth.service';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private userService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    let user, payload;

    try {
      payload = await this.authService.verify(token);
      user = await this.userService.find({
        where: { user_id: payload.user_id },
      });
      request['user'] = user;
    } catch (e) {
      throw ErrorHandler(HttpStatus.FORBIDDEN, ERROR_MESSAGES.INVALID_TOKEN);
    }

    if (user.token_valid_from.getTime() > payload.iat * 1000) {
      throw ErrorHandler(HttpStatus.FORBIDDEN, ERROR_MESSAGES.INVALIDATED_TOKEN);
    }

    return true;
  }

  private extractTokenFromHeader({ headers }: { headers: Headers & { authorization?: string } }): string | undefined {
    const [type, token] = headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

@Injectable()
export class GqlAuthGuard extends JwtAuthGuard {
  canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();

    return super.canActivate(new ExecutionContextHost([req]));
  }

  handleRequest(err: any, user: any) {
    if (err || !user) {
      throw err || new AuthenticationError('GqlAuthGuard');
    }
    return user;
  }
}
