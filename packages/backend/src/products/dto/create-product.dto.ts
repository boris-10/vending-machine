import { IsInt, IsPositive, IsNotEmpty, IsString, IsDivisibleBy } from 'class-validator'

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsInt()
  @IsPositive()
  amountAvailable: number

  @IsDivisibleBy(5) // 👈  check if we can return changes using 5, 10, 20, 50, and 100 cents
  @IsInt()
  @IsPositive()
  cost: number
}
