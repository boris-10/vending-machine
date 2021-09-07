import { IsInt } from 'class-validator'

export class DepositRequestDto {
  @IsInt()
  amount!: number
}
