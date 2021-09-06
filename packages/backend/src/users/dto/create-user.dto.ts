import { IsString, IsInt, IsOptional } from 'class-validator'

export class CreateUserDto {
  @IsString()
  username: string

  @IsString()
  password: string

  @IsInt()
  @IsOptional()
  deposit: number

  @IsString()
  @IsOptional()
  role: string
}
