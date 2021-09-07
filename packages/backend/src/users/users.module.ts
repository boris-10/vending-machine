import { Module } from '@nestjs/common'
import { PrismaModule } from 'nestjs-prisma'
import { AuthModule } from 'src/auth/auth.module'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
