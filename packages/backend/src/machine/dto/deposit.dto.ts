import { IsIn, IsInt, IsPositive } from 'class-validator'

import { DENOMINATIONS } from '../machine.constants'

export class DepositDto {
  @IsInt()
  @IsPositive()
  @IsIn(DENOMINATIONS)
  amount: number
}
