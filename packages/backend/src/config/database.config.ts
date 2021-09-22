import { Inject } from '@nestjs/common'
import { ConfigType, registerAs } from '@nestjs/config'

import { DATABASE_CONFIG } from './constants'

export const databaseConfig = registerAs(DATABASE_CONFIG, () => ({
  driver: process.env.DATABASE_DRIVER,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  name: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
}))

export const DatabaseConfig = () => Inject(databaseConfig.KEY)
export type DatabaseConfigType = ConfigType<typeof databaseConfig>
