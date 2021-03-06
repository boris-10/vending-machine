import { IsAlphanumeric, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator'

import { UserRole } from '../user-role'

export class CreateUserDto {
  @IsNotEmpty()
  @IsAlphanumeric()
  username: string

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string

  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole
}
