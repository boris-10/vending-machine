import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { ConfigModule, ConfigType } from '@nestjs/config'
import { PrismaModule } from 'nestjs-prisma'
import { AppConfig } from '../app.config'
import { UsersService } from './users.service'
import { JwtStrategy } from './auth/jwtAuth.strategy'
import { PasswordService } from './password.service'
import { UsersController } from './users.controller'

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [AppConfig.KEY],
      useFactory: async (config: ConfigType<typeof AppConfig>) => ({
        secret: config.jwtSecret,
      }),
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, PasswordService, JwtStrategy],
})
export class UsersModule {}
