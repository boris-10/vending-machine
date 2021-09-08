import { Controller, Post, Body, UnauthorizedException, Get, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { CurrentUser } from './current-user.decorator'
import { CredentialsDto } from './dto/credentials.dto'
import { UserInfo } from './entity/user-info.entity'
import { JwtAuthGuard } from './jwt-auth.guard'

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

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me(@CurrentUser() userInfo: UserInfo) {
    return userInfo
  }
}
