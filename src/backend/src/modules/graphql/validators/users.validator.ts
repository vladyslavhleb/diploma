import * as zod from 'zod';

export const RegisterSchema = zod.object({
  nickname: zod.string().min(8).max(16),
  password: zod.string().min(8).max(16),
});
