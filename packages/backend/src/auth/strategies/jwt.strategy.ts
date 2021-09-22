import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { JWTConfig, jwtConfig } from '../../config/jwt.config'
import { UsersService } from '../../users/users.service'
import { TokenPayload } from '../interfaces/token-payload.interface'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService, @JWTConfig() private readonly jwt: ConfigType<typeof jwtConfig>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwt.secret,
    })
  }

  async validate({ sub: id }: TokenPayload) {
    const user = await this.usersService.findById(id)
    if (!user) {
      throw new UnauthorizedException()
    }

    return user
  }
}
