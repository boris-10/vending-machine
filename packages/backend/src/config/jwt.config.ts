import { Inject } from '@nestjs/common'
import { ConfigType, registerAs } from '@nestjs/config'

import { JWT_CONFIG } from './constants'

export const jwtConfig = registerAs(JWT_CONFIG, () => ({
  secret: process.env.ACCESS_TOKEN_SECRET,
  exp: process.env.ACCESS_TOKEN_EXPIRATION_TIME,
}))

export const JWTConfig = () => Inject(jwtConfig.KEY)
export type JWTConfigType = ConfigType<typeof jwtConfig>
