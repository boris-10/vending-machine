import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { Connection } from 'typeorm'

import { Product } from '../products/entities/product.entity'
import { ProductsService } from '../products/products.service'
import { User } from '../users/entities/user.entity'
import { UsersService } from '../users/users.service'
import { ChangeCalculatorBase } from './change-calculator-base'
import { DepositDto } from './dto/deposit.dto'
import { PurchaseDto } from './dto/purchase.dto'
import { CHANGE_CALCULATOR } from './machine.constants'

@Injectable()
export class MachineService {
  constructor(
    private readonly userService: UsersService,
    private readonly productService: ProductsService,
    @Inject(CHANGE_CALCULATOR)
    private readonly changeCalculator: ChangeCalculatorBase,
    private connection: Connection
  ) {}

  async deposit({ id, deposit }: User, { amount }: DepositDto) {
    return this.userService.update(id, { deposit: deposit + amount })
  }

  async resetDeposit({ id }: User) {
    await this.userService.update(id, { deposit: 0 })
  }

  async purchase({ id: userId, deposit }: User, { productId, amount }: PurchaseDto) {
    const product = await this.productService.findOne(productId)

    if (!product) {
      throw new NotFoundException(`Product with id ${productId} does not exists`)
    }

    if (amount > product.amountAvailable) {
      throw new BadRequestException('Not enough items in the vending machine')
    }

    const total = product.cost * amount
    if (total > deposit) {
      throw new BadRequestException(`Not enough money in the deposit`)
    }

    await this.connection.transaction(async (manager) => {
      await manager.update(Product, productId, {
        amountAvailable: product.amountAvailable - amount,
      })
      await manager.update(User, userId, { deposit: 0 })
    })

    const remainder = deposit - total

    return this.changeCalculator.getChange(remainder)
  }
}
