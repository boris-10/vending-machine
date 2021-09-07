import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common'
import { AuthService } from './auth.service'
import { CredentialsDto } from './dto/credentials.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() { username, password }: CredentialsDto) {
    const user = await this.authService.validateUser(username, password)
    if (!user) {
      throw new UnauthorizedException('The credentials are incorrect')
    }

    const accessToken = await this.authService.generateAccessToken(user.username)

    return { accessToken }
  }
}
