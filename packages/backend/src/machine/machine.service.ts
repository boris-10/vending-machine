import { Injectable } from '@nestjs/common'
import { ProductsService } from 'src/products/products.service'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class MachineService {
  constructor(protected readonly usersService: UsersService, protected readonly productsService: ProductsService) {}

  reset() {
    throw new Error('Method not implemented.')
  }

  buy(productId: number, amount: number) {
    throw new Error('Method not implemented.')
  }

  deposit(amount: number) {
    throw new Error('Method not implemented.')
  }
}
