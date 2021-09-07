import { IsInt } from 'class-validator'

export class BuyRequestDto {
  @IsInt()
  productId: number

  @IsInt()
  amount: number
}
