import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserPayload } from 'src/modules/auth/jwt.strategy';

export const CurrentUser = createParamDecorator(
  (_: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    return request.user as UserPayload;
  },
);
