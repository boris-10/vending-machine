import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UsersService } from '../users/users.service'
import { AppConfig } from '../app.config'
import { ConfigType } from '@nestjs/config'

interface TokenPayload {
  username: string
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private usersService: UsersService,
    @Inject(AppConfig.KEY) private readonly config: ConfigType<typeof AppConfig>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.jwtSecret,
    })
  }

  async validate({ username }: TokenPayload) {
    const user = await this.usersService.findByUsername(username)
    if (!user) {
      throw new UnauthorizedException()
    }

    return user
  }
}
