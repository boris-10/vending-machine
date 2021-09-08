import { IsIn, IsInt, IsPositive } from 'class-validator'
import { COIN_DENOMINATIONS } from 'src/app.constants'

export class DepositRequestDto {
  @IsInt()
  @IsPositive()
  @IsIn(COIN_DENOMINATIONS)
  amount: number
}
