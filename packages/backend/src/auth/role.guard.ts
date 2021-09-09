import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Request } from 'express'
import { Reflector } from '@nestjs/core'
import { UserInfo } from './entity/user-info.entity'
import { ROLES_METADATA_KEY } from './auth.constants'

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>(ROLES_METADATA_KEY, context.getHandler())
    if (!roles) {
      return true
    }

    const request = context.switchToHttp().getRequest<Request>()
    const userInfo: UserInfo = request.user

    return roles.includes(userInfo.role)
  }
}
