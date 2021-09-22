import { Inject } from '@nestjs/common'
import { ConfigType, registerAs } from '@nestjs/config'

import { APP_CONFIG } from './constants'

export const appConfig = registerAs(APP_CONFIG, () => ({
  env: process.env.APP_ENV,
  host: process.env.APP_HOST,
  name: process.env.APP_NAME,
  port: process.env.APP_PORT,
  bcrpytSalt: process.env.BCRYPT_SALT,
}))

export const AppConfig = () => Inject(appConfig.KEY)
export type AppConfigType = ConfigType<typeof appConfig>
