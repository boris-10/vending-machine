import { IsNotEmpty, IsString, MinLength } from 'class-validator'

export class SignInDto {
  @IsNotEmpty()
  @IsString()
  username: string

  @IsString()
  @MinLength(8)
  password: string
}
