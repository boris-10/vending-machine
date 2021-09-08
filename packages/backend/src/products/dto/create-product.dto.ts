import { IsInt, IsPositive, IsNotEmpty, IsAlphanumeric } from 'class-validator'

export class CreateProductDto {
  @IsNotEmpty()
  @IsAlphanumeric()
  productName: string

  @IsInt()
  @IsPositive()
  amountAvailable: number

  @IsInt()
  @IsPositive()
  cost: number

  @IsInt()
  @IsPositive()
  sellerId: number
}
