import { Exclude } from 'class-transformer'
import { IsAlphanumeric, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from 'class-validator'

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
}
