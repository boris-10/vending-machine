import { Test, TestingModule } from '@nestjs/testing'
import { Connection } from 'typeorm'

import { MachineService } from './machine.service'
import { UserRole } from '../users/user-role'
import { UsersService } from '../users/users.service'
import { ProductsService } from '../products/products.service'
import { ChangeCalculator } from './change-calculator'
import { CHANGE_CALCULATOR, DENOMINATIONS } from './machine.constants'

type JestMock<T> = {
  [P in keyof T]?: jest.Mock
}

const BUYER = {
  id: 1,
  username: 'Buyer',
  password: '12345678',
  role: UserRole.Buyer,
  deposit: 100,
  products: [],
}

const PRODUCT = {
  id: 1,
  name: 'Coca Cola',
  amountAvailable: 10,
  cost: 10,
}

describe('MachineService', () => {
  let service: MachineService
  let mockUserService: JestMock<UsersService>
  let mockProductsService: JestMock<ProductsService>

  beforeEach(async () => {
    mockUserService = {
      update: jest.fn(() => Promise.resolve()),
    }

    mockProductsService = {
      findOne: jest.fn((id) => Promise.resolve(id === PRODUCT.id ? PRODUCT : null)),
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MachineService,
        { provide: UsersService, useValue: mockUserService },
        { provide: ProductsService, useValue: mockProductsService },
        {
          provide: CHANGE_CALCULATOR,
          useValue: new ChangeCalculator([...DENOMINATIONS]),
        },
        { provide: Connection, useValue: { transaction: jest.fn() } },
      ],
    }).compile()

    service = module.get<MachineService>(MachineService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should return change (amount 3)', () => {
    expect(service.purchase(BUYER, { productId: 1, amount: 3 })).resolves.toEqual({
      50: 1,
      20: 1,
    })
  })

  it('should throw an error if product not found', async () => {
    const productId = 2
    try {
      await service.purchase(BUYER, { productId, amount: 5 })
    } catch (err) {
      expect(err.message).toEqual(`Product with id ${productId} does not exists`)
    }
  })

  it('should throw an error that there is no enough items in the machine', async () => {
    try {
      await service.purchase(BUYER, { productId: 1, amount: 11 })
    } catch (err) {
      expect(err.message).toEqual('Not enough items in the vending machine')
    }
  })

  it('should throw an error if there is no enough deposit to buy product', async () => {
    try {
      await service.purchase({ ...BUYER, deposit: 20 }, { productId: 1, amount: 5 })
    } catch (err) {
      expect(err.message).toEqual('Not enough money in the deposit')
    }
  })
})
