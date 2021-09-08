import { IsIn, IsInt, IsPositive } from 'class-validator'
import { COIN_DENOMINATORS } from 'src/app.constants'

export class DepositRequestDto {
  @IsInt()
  @IsPositive()
  @IsIn(COIN_DENOMINATORS)
  amount: number
}
