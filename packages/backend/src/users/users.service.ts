import { Injectable, ConflictException } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { PasswordService } from '../auth/password.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UsersService {
  constructor(protected readonly prisma: PrismaService, protected readonly passwordService: PasswordService) {}

  async create(createUserDto: CreateUserDto) {
    if (await this.isUsernameTaken(createUserDto.username)) {
      throw new ConflictException('Username already taken')
    }

    return this.prisma.user.create({
      data: {
        username: createUserDto.username,
        password: this.passwordService.hash(createUserDto.password),
        role: createUserDto.role,
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

  findByUsername(username: string) {
    return this.prisma.user.findUnique({
      where: {
        username,
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
        password: updateUserDto.password ? this.passwordService.hash(updateUserDto.password) : undefined,
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

  private async isUsernameTaken(username: string): Promise<boolean> {
    const count = await this.prisma.user.count({
      where: {
        username,
      },
    })

    return count !== 0
  }
}
