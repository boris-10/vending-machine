import { Controller, Post, Body, UseGuards } from '@nestjs/common'
import { MachineService } from './machine.service'
import { BuyRequestDto } from './dto/buy-request.dto'
import { DepositRequestDto } from './dto/deposit-request.dto'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { CurrentUser } from '../auth/current-user.decorator'
import { Roles } from '../auth/roles.decorator'
import { RoleGuard } from '../auth/role.guard'

@Controller('machine')
@UseGuards(RoleGuard)
export class MachineController {
  constructor(private readonly machineService: MachineService) {}

  @Post('deposit')
  @Roles('buyer')
  @UseGuards(JwtAuthGuard)
  deposit(@Body() { amount }: DepositRequestDto, @CurrentUser('id') userId: number) {
    return this.machineService.deposit(userId, amount)
  }

  @Post('buy')
  @Roles('buyer')
  @UseGuards(JwtAuthGuard)
  buy(@Body() { productId, amount }: BuyRequestDto, @CurrentUser('id') userId: number) {
    return this.machineService.buy(userId, productId, amount)
  }

  @Post('reset')
  @Roles('buyer')
  @UseGuards(JwtAuthGuard)
  reset(@CurrentUser('id') userId: number) {
    return this.machineService.reset(userId)
  }
}
