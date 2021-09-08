import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { COIN_DENOMINATORS } from 'src/app.constants'
import { ProductsService } from 'src/products/products.service'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class MachineService {
  constructor(
    protected readonly usersService: UsersService,
    protected readonly productsService: ProductsService,
    protected readonly prisma: PrismaService
  ) {}

  async reset(userId: number) {
    await this.usersService.update(userId, {
      deposit: 0,
    })
  }

  async buy(userId: number, productId: number, amount: number) {
    const user = await this.usersService.findOne(userId)
    const product = await this.productsService.findOne(productId)

    if (amount > product.amountAvailable) {
      throw new BadRequestException('Not enough items in vending machine. Try reducing buy amount.')
    }

    const totalPrice = product.cost * amount
    if (totalPrice > user.deposit) {
      throw new BadRequestException(`Not enough money to buy: ${amount} ${product.productName}.`)
    }

    const depositRemaining = user.deposit - totalPrice

    await this.prisma.$transaction([
      this.productsService.update(productId, {
        amountAvailable: product.amountAvailable - amount,
      }),
      this.usersService.update(userId, {
        deposit: 0,
      }),
    ])

    return this.splitToCoins(depositRemaining)
  }

  async deposit(userId: number, amount: number) {
    const user = await this.usersService.findOne(userId)

    return this.usersService.update(userId, {
      deposit: user.deposit + amount,
    })
  }

  private splitToCoins(amount: number): { coin: number; count: number }[] {
    const denominations = COIN_DENOMINATORS
    const result = []

    while (amount > 0) {
      if (!denominations.length) {
        result.push({ coin: 0, count: amount })
        break
      }

      const coin = denominations.pop()
      const count = Math.floor(amount / coin)

      amount -= count * coin

      if (count) {
        result.push({ coin, count })
      }
    }

    return result
  }

  private validCoinPrice(amount: number) {
    return !this.splitToCoins(amount).some((el) => el.coin === 0)
  }
}
