import { createHash } from 'crypto';
import { v4 as uuidv4 } from 'uuid';

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '../users/users.repository';

export type JwtPayload = { user_id: User['user_id']; iat: number };
@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  sign(payload: { user_id: User['user_id'] }) {
    return this.jwtService.signAsync(payload);
  }

  verify(token: string) {
    return this.jwtService.verifyAsync<JwtPayload>(token);
  }

  verifyExpired(token: string) {
    return this.jwtService.verifyAsync<JwtPayload>(token, { ignoreExpiration: true });
  }

  async hashPassword(plainPassword: string) {
    return this.createHash(plainPassword);
  }
  comparePasswords(plainPassword: string, hashedPassword: string) {
    return this.createHash(plainPassword) === hashedPassword;
  }

  createRefreshToken() {
    return uuidv4();
  }
  private createHash(plainText) {
    return createHash('sha256').update(plainText).digest('hex').toString();
  }

  async generateTokens(user_id: User['user_id']) {
    const access_token = await this.sign({ user_id });
    const refresh_token = this.createRefreshToken();
    return { access_token, refresh_token };
  }
}
