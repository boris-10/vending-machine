import { createParamDecorator, ExecutionContext } from '@nestjs/common'

import { User } from '../../users/entities/user.entity'

export const SignedInUser = createParamDecorator(function (key: keyof User, ctx: ExecutionContext): User {
  const request = ctx.switchToHttp().getRequest()

  return key ? request.user[key] : request.user
})
