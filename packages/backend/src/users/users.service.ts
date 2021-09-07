import { Injectable, ConflictException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from 'nestjs-prisma'
import { User } from '@prisma/client'
import { PasswordService } from './password.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    protected readonly passwordService: PasswordService,
    private readonly jwtService: JwtService
  ) {}

  async create(createUserDto: CreateUserDto) {
    if (await this.isUsernameTaken(createUserDto.username)) {
      throw new ConflictException('Username already taken')
    }

    return this.prisma.user.create({
      data: {
        username: createUserDto.username,
        password: await this.passwordService.hash(createUserDto.password),
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

  private async isUsernameTaken(username: string): Promise<boolean> {
    const count = await this.prisma.user.count({
      where: {
        username,
      },
    })

    return count !== 0
  }

  async validateUser(username: string, password: string): Promise<Partial<User> | null> {
    const user = await this.findByUsername(username)

    if (user && (await this.passwordService.compare(password, user.password))) {
      return user
    }

    return null
  }

  generateAccessToken(username: string): Promise<string> {
    return this.jwtService.signAsync({ username })
  }
}
