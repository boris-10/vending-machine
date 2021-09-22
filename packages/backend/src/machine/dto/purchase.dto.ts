import { IsInt, IsPositive } from 'class-validator'

export class PurchaseDto {
  @IsInt()
  @IsPositive()
  productId: number

  @IsInt()
  @IsPositive()
  amount: number
}
