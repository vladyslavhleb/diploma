import * as _ from 'lodash';

import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UserResponse } from '../../../modules/users/users.interface';
import { User } from '../../../modules/users/users.repository';
import { UsersService } from '../../../modules/users/users.service';

export class GetUserAction {
  constructor(public readonly user_id: User['user_id']) {}
}

@CommandHandler(GetUserAction)
export class GetUserHandler implements ICommandHandler<GetUserAction> {
  constructor(private readonly userService: UsersService) {}

  async execute(userInfo: GetUserAction): Promise<UserResponse> {
    const user = await this.userService.find({
      where: { user_id: userInfo.user_id },
      relations: {
        chats: { users: true },
      },
    });
    return _.pick(user, ['user_id', 'nickname', 'chats']);
  }
}
