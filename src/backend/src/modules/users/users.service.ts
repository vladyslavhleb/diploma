import { FindOneOptions, Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    public readonly userRepository: Repository<User>,
  ) {}
  async createUser(user: Partial<User>) {
    return this.userRepository.save(user);
  }
  async find(options?: FindOneOptions<User>) {
    return this.userRepository.findOne(options);
  }

  async update(user: Partial<User>) {
    return this.userRepository.save(user);
  }
}
