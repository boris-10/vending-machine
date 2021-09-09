import { IsIn, IsInt, IsPositive } from 'class-validator'
import { COIN_DENOMINATIONS } from '../../price/price.constants'

export class DepositRequestDto {
  @IsInt()
  @IsPositive()
  @IsIn(COIN_DENOMINATIONS)
  amount: number
}
