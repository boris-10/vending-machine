import { IsIn, IsInt, IsPositive } from 'class-validator'

export class DepositRequestDto {
  @IsInt()
  @IsPositive()
  @IsIn([5, 10, 20, 50, 100])
  amount: number
}
