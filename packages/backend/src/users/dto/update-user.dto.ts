import { Exclude } from 'class-transformer'
import { IsAlphanumeric, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from 'class-validator'
import { UserRole } from '../user-role'

export class UpdateUserDto {
  @IsNotEmpty()
  @IsAlphanumeric()
  username?: string

  @Exclude({ toClassOnly: true })
  @IsString()
  @MinLength(8)
  @IsOptional()
  password?: string

  @IsNumber()
  @IsOptional()
  deposit?: number

  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole
}
