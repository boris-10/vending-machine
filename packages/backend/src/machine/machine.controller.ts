import { Controller, Post, Body, UseGuards } from '@nestjs/common'
import { MachineService } from './machine.service'
import { BuyRequestDto } from './dto/buy-request.dto'
import { DepositRequestDto } from './dto/deposit-request.dto'
import { UserInfo } from '../auth/entity/user-info.entity'
import { CurrentUser } from '../auth/current-user.decorator'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@Controller('machine')
export class MachineController {
  constructor(private readonly machineService: MachineService) {}

  @Post('deposit')
  @UseGuards(JwtAuthGuard)
  deposit(@Body() { amount }: DepositRequestDto, @CurrentUser() { id: userId }: UserInfo) {
    return this.machineService.deposit(userId, amount)
  }

  @Post('buy')
  @UseGuards(JwtAuthGuard)
  buy(@Body() { productId, amount }: BuyRequestDto, @CurrentUser() { id: userId }: UserInfo) {
    return this.machineService.buy(userId, productId, amount)
  }

  @Post('reset')
  @UseGuards(JwtAuthGuard)
  reset(@CurrentUser() { id: userId }: UserInfo) {
    return this.machineService.reset(userId)
  }
}
