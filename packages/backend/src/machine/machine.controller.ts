import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common'

import { Roles } from '../auth/decorators/roles.decorator'
import { SignedInUser } from '../auth/decorators/signed-in-user.decorator'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { RoleGuard } from '../auth/guards/role.guard'
import { User } from '../users/entities/user.entity'
import { UserRole } from '../users/user-role'
import { DepositDto } from './dto/deposit.dto'
import { PurchaseDto } from './dto/purchase.dto'
import { MachineService } from './machine.service'

@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('machine')
export class MachineController {
  constructor(private readonly machineService: MachineService) {}

  @Post('deposit')
  @Roles(UserRole.Buyer)
  deposit(@Body() depositDto: DepositDto, @SignedInUser() user: User) {
    return this.machineService.deposit(user, depositDto)
  }

  @Post('reset-deposit')
  @HttpCode(200)
  @Roles(UserRole.Buyer)
  resetDeposit(@SignedInUser() user: User) {
    return this.machineService.resetDeposit(user)
  }

  @Post('purchase')
  @Roles(UserRole.Buyer)
  purchase(@Body() purchaseDto: PurchaseDto, @SignedInUser() user: User) {
    return this.machineService.purchase(user, purchaseDto)
  }
}
