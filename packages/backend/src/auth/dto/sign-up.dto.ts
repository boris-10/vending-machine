import { IsAlphanumeric, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator'

import { UserRole } from '../../users/user-role'

export class SignUpDto {
  @IsNotEmpty()
  @IsAlphanumeric()
  username: string

  @IsString()
  @MinLength(8)
  password: string

  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole
}
