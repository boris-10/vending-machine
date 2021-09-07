import { forwardRef, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { ConfigModule, ConfigType } from '@nestjs/config'
import { UsersModule } from '../users/users.module'
import { JwtStrategy } from './jwt-auth.strategy'
import { PasswordService } from './password.service'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'

import { AppConfig } from '../app.config'

@Module({
  imports: [
    forwardRef(() => UsersModule),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [AppConfig.KEY],
      useFactory: async (config: ConfigType<typeof AppConfig>) => ({
        secret: config.jwtSecret,
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PasswordService, JwtStrategy],
  exports: [PasswordService],
})
export class AuthModule {}
