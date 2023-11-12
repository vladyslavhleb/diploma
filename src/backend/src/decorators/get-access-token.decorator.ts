import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const GetAccessToken = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const context = GqlExecutionContext.create(ctx);
  return context.getContext().req.headers['authorization'].split(' ')[1];
});
