import { Controller, Post, Body } from '@nestjs/common'
import { MachineService } from './machine.service'
import { BuyRequestDto } from './dto/buy-request.dto'
import { DepositRequestDto } from './dto/deposit-request.dto'

@Controller('machine')
export class MachineController {
  constructor(private readonly machineService: MachineService) {}

  @Post('deposit')
  deposit(@Body() { amount }: DepositRequestDto) {
    return this.machineService.deposit(amount)
  }

  @Post('buy')
  buy(@Body() { productId, amount }: BuyRequestDto) {
    return this.machineService.buy(productId, amount)
  }

  @Post('reset')
  reset() {
    return this.machineService.reset()
  }
}
