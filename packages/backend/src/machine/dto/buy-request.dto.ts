import { IsInt, IsPositive } from 'class-validator'

export class BuyRequestDto {
  @IsInt()
  @IsPositive()
  productId: number

  @IsInt()
  @IsPositive()
  amount: number
}
