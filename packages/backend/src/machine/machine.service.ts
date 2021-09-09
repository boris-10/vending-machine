import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { PriceService } from '../price/price.service'
import { ProductsService } from '../products/products.service'
import { UsersService } from '../users/users.service'

@Injectable()
export class MachineService {
  constructor(
    protected readonly usersService: UsersService,
    protected readonly productsService: ProductsService,
    protected readonly priceService: PriceService,
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

    if (!product) {
      throw new BadRequestException("Product doesn't exist.")
    }

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

    return this.priceService.splitToCoins(depositRemaining)
  }

  async deposit(userId: number, amount: number) {
    const user = await this.usersService.findOne(userId)

    return this.usersService.update(userId, {
      deposit: user.deposit + amount,
    })
  }
}
