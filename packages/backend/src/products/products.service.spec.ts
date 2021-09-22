import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Product } from './entities/product.entity'
import { ProductsService } from './products.service'
import { UserRole } from '../users/user-role'

type JestMock<T> = {
  [P in keyof T]?: jest.Mock
}

const SELLER = {
  id: 1,
  username: 'Seller',
  password: '12345678',
  role: UserRole.Seller,
  deposit: 0,
  products: [],
}

const PRODUCT = {
  id: 1,
  name: 'Coca Cola',
  amountAvailable: 3,
  cost: 10,
}

describe('ProductsService', () => {
  let service: ProductsService
  let mockRepository: JestMock<Repository<Product>>

  beforeEach(async () => {
    mockRepository = {
      create: jest.fn(() => Promise.resolve(PRODUCT)),
      save: jest.fn(() => Promise.resolve(PRODUCT)),
      find: jest.fn(() => Promise.resolve([PRODUCT])),
      findOne: jest.fn(() => Promise.resolve(PRODUCT)),
      update: jest.fn(() => Promise.resolve(PRODUCT)),
      delete: jest.fn(() => Promise.resolve(PRODUCT)),
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockRepository,
        },
      ],
    }).compile()

    service = module.get<ProductsService>(ProductsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should create products', () => {
    expect(service.create(SELLER, PRODUCT)).resolves.toEqual(PRODUCT)
    expect(mockRepository.create).toHaveBeenCalledTimes(1)
  })

  it('should find all products', () => {
    expect(service.findAll()).resolves.toEqual([PRODUCT])
    expect(mockRepository.find).toHaveBeenCalledTimes(1)
  })

  it('should find product', () => {
    expect(service.findOne(1)).resolves.toEqual(PRODUCT)
    expect(mockRepository.findOne).toHaveBeenCalledTimes(1)
  })

  it('should update one product', () => {
    expect(service.update(1, PRODUCT)).resolves.toEqual(PRODUCT)
    expect(mockRepository.update).toHaveBeenCalledTimes(1)
  })

  it('should remove one product', () => {
    expect(service.remove(1)).resolves.toEqual(PRODUCT)
    expect(mockRepository.delete).toHaveBeenCalledTimes(1)
  })
})
