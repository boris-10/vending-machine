import {
  Controller,
  Delete,
  ClassSerializerInterceptor,
  UseInterceptors,
  Get,
  UseGuards,
  Body,
  Patch,
} from '@nestjs/common'

import { SignedInUser } from '../auth/decorators/signed-in-user.decorator'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'
import { UsersService } from './users.service'

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@SignedInUser() user: User) {
    return user
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  update(@Body() updateUserDto: UpdateUserDto, @SignedInUser() user: User) {
    return this.usersService.update(user.id, updateUserDto)
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@SignedInUser() user: User) {
    return this.usersService.remove(user.id)
  }
}
