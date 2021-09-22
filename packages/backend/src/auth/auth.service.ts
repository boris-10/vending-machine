import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { SignInDto } from './dto/sign-in.dto'
import { SignUpDto } from './dto/sign-up.dto'
import { UsersService } from '../users/users.service'
import { PasswordService } from './password.service'
import { PostgresError } from '../common/errors/postgres.error'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findByUsername(username)
    if (user && (await this.passwordService.compare(password, user.password))) {
      return user
    }

    return null
  }

  async signUp({ username, password, role }: SignUpDto) {
    const hashedPassword = await this.passwordService.hash(password)

    try {
      const user = await this.userService.create({
        username,
        role,
        password: hashedPassword,
      })

      return user
    } catch (error) {
      if (error?.code === PostgresError.UniqueViolation) {
        throw new ConflictException(`User with username ${username} already exists`)
      }
      throw new BadRequestException()
    }
  }

  async signIn({ username, password }: SignInDto) {
    const user = await this.validateUser(username, password)
    if (!user) {
      throw new UnauthorizedException('Provided credentials are incorrect')
    }

    return this.jwtService.signAsync({
      sub: user.id,
      username: user.username,
    })
  }

  async changePassword(id: number, password: string) {
    const hashedPassword = await this.passwordService.hash(password)
    await this.userService.update(id, { password: hashedPassword })
  }
}
