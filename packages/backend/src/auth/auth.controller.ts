import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'

import { AuthService } from './auth.service'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { SignedInUser } from './decorators/signed-in-user.decorator'
import { SignInDto } from './dto/sign-in.dto'
import { SignUpDto } from './dto/sign-up.dto'
import { ChangePasswordDto } from './dto/change-password.dto'

@Controller('')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  @HttpCode(200)
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto)
  }

  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto)
  }

  @UseGuards(JwtAuthGuard)
  @Patch('change-password')
  changePassword(@SignedInUser('id') id: number, @Body() { newPassword }: ChangePasswordDto) {
    return this.authService.changePassword(id, newPassword)
  }
}
