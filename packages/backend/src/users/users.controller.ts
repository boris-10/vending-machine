import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common'
import { Throttle, ThrottlerGuard } from '@nestjs/throttler'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { RoleGuard } from '../auth/role.guard'
import { Roles } from '../auth/roles.decorator'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(ThrottlerGuard)
  @Throttle(4, 15)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Get()
  @Roles('seller')
  @UseGuards(RoleGuard)
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.usersService.findAll()
  }

  @Get(':id')
  @Roles('seller')
  @UseGuards(RoleGuard)
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id)
  }

  @Patch(':id')
  @Roles('seller', 'buyer')
  @UseGuards(RoleGuard)
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto)
  }

  @Delete(':id')
  @Roles('seller')
  @UseGuards(RoleGuard)
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id)
  }
}
