import { BadRequestException, Injectable } from '@nestjs/common'
import { ProductsService } from 'src/products/products.service'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class MachineService {
  constructor(protected readonly usersService: UsersService, protected readonly productsService: ProductsService) {}

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

    await this.usersService.update(userId, {
      deposit: user.deposit - totalPrice,
    })

    await this.productsService.update(userId, {
      amountAvailable: product.amountAvailable - amount,
    })
  }

  async deposit(userId: number, amount: number) {
    const user = await this.usersService.findOne(userId)

    return this.usersService.update(userId, {
      deposit: user.deposit + amount,
    })
  }
}
