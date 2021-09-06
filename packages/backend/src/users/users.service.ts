import { Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        username: createUserDto.username,
        password: createUserDto.password,
        role: createUserDto.role,
        deposit: createUserDto.deposit,
      },
    })
  }

  findAll() {
    return this.prisma.user.findMany()
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    })
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        username: updateUserDto.username,
        password: updateUserDto.password,
        role: updateUserDto.role,
        deposit: updateUserDto.deposit,
      },
    })
  }

  remove(id: number) {
    return this.prisma.user.delete({
      where: {
        id,
      },
    })
  }
}
