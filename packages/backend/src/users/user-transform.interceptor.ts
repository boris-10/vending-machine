import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { UserInfo } from '../auth/entity/user-info.entity'

@Injectable()
export class UserTransformInterceptor implements NestInterceptor {
  private removePasswordField(entity: UserInfo) {
    if (entity) {
      delete entity.password
    }

    return entity
  }
  intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((value) => {
        return Array.isArray(value) ? value.map(this.removePasswordField) : this.removePasswordField(value)
      })
    )
  }
}
