import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from '@prisma/client'
import { UsersService } from '../users/users.service'
import { PasswordService } from './password.service'

@Injectable()
export class AuthService {
  constructor(
    protected readonly passwordService: PasswordService,
    protected readonly jwtService: JwtService,
    protected readonly usersService: UsersService
  ) {}

  async validateUser(username: string, password: string): Promise<Partial<User> | null> {
    const user = await this.usersService.findByUsername(username)

    if (user && (await this.passwordService.compare(password, user.password))) {
      return user
    }

    return null
  }

  generateAccessToken(username: string): Promise<string> {
    return this.jwtService.signAsync({ username })
  }
}
