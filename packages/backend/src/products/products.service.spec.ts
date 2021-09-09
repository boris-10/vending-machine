import { Test, TestingModule } from '@nestjs/testing'
import { PrismaModule, PrismaService } from 'nestjs-prisma'
import { PriceModule } from '../price/price.module'
import { ProductsService } from './products.service'

const [PRODUCT1, PRODUCT2] = [
  {
    productName: 'Apple',
    amountAvailable: 3,
    cost: 10,
    sellerId: 1,
  },
  {
    productName: 'Soda',
    amountAvailable: 8,
    cost: 25,
    sellerId: 1,
  },
]

const PROMISE_PRODUCT1 = Promise.resolve(PRODUCT1)

describe('ProductsService', () => {
  let service: ProductsService
  let prismaService: any

  beforeEach(async () => {
    prismaService = {
      product: {
        create: jest.fn(() => PROMISE_PRODUCT1),
        findUnique: jest.fn(() => PROMISE_PRODUCT1),
        findMany: jest.fn(() => Promise.resolve([PRODUCT1, PRODUCT2])),
        update: jest.fn(() => PROMISE_PRODUCT1),
        delete: jest.fn(() => PROMISE_PRODUCT1),
      },
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: PrismaService,
          useValue: prismaService,
        },
      ],
      imports: [PrismaModule, PriceModule],
    }).compile()

    service = module.get<ProductsService>(ProductsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should create valid product', () => {
    expect(service.create(PRODUCT1)).resolves.toEqual(PRODUCT1)
    expect(prismaService.product.create).toHaveBeenCalledTimes(1)
  })

  it("shouldn't create valid product", () => {
    const product = { ...PRODUCT1 }
    product.cost = 12

    expect(() => service.create(product)).toThrow()
    expect(prismaService.product.create).not.toHaveBeenCalled()
  })

  it('should find valid products', () => {
    expect(service.findAll()).resolves.toEqual([PRODUCT1, PRODUCT2])
    expect(prismaService.product.findMany).toHaveBeenCalledTimes(1)
  })

  it('should find one product', () => {
    expect(service.findOne(1)).resolves.toEqual(PRODUCT1)
    expect(prismaService.product.findUnique).toHaveBeenCalledTimes(1)
  })

  it('should update one product', () => {
    expect(service.update(1, PRODUCT1)).resolves.toEqual(PRODUCT1)
    expect(prismaService.product.update).toHaveBeenCalledTimes(1)
  })

  it('should remove one product', () => {
    expect(service.remove(1)).resolves.toEqual(PRODUCT1)
    expect(prismaService.product.delete).toHaveBeenCalledTimes(1)
  })
})
