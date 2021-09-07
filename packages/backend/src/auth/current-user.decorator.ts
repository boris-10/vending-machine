import { createParamDecorator, ExecutionContext } from '@nestjs/common'

import { UserInfo } from './entity/user-info.entity'

export const CurrentUser = createParamDecorator(function (key: keyof UserInfo, ctx: ExecutionContext): UserInfo {
  const request = ctx.switchToHttp().getRequest()

  return key ? request.user[key] : request.user
})
