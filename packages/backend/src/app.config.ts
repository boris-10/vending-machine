import { registerAs } from '@nestjs/config'

export const APP_CONFIG = 'APP_CONFIG'

export const AppConfig = registerAs(APP_CONFIG, () => ({
  nodeEnv: process.env.NODE_ENV,
  bcryptSalt: process.env.BCRYPT_SALT,
  jwtSecret: process.env.JWT_SECRET,
}))
