import { IsString, IsOptional, IsAlphanumeric, IsNotEmpty, Matches } from 'class-validator'

export class CreateUserDto {
  @IsNotEmpty()
  @IsAlphanumeric()
  username: string

  @IsString()
  @IsNotEmpty()
  password: string

  @IsString()
  @IsOptional()
  @Matches(/^(buyer|seller)$/, { message: "Can't match role, use 'buyer' or 'seller'" })
  role: 'buyer' | 'seller'
}
