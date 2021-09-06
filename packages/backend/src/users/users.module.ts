import { Module } from '@nestjs/common'
import { PrismaModule } from 'nestjs-prisma'
import { UsersService } from './users.service'
import { PasswordService } from './password.service'
import { UsersController } from './users.controller'

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UsersService, PasswordService],
})
export class UsersModule {}
