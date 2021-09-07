import { IsString, IsInt } from 'class-validator'

export class CreateProductDto {
  @IsString()
  productName: string

  @IsInt()
  amountAvailable: number

  @IsInt()
  cost: number

  @IsInt()
  sellerId: number
}
