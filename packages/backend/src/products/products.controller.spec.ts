import { ValidationPipe } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, ExecutionContext } from '@nestjs/common'
import * as request from 'supertest'
import { ProductsController } from './products.controller'
import { ProductsService } from './products.service'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

const SELLER_ID = 1
const [PRODUCT1, PRODUCT2] = [
  {
    productName: 'Apple',
    amountAvailable: 3,
    cost: 10,
    sellerId: SELLER_ID,
  },
  {
    productName: 'Soda',
    amountAvailable: 8,
    cost: 25,
    sellerId: 2,
  },
]

const PROMISE_PRODUCT1 = Promise.resolve(PRODUCT1)
const PROMISE_PRODUCT2 = Promise.resolve(PRODUCT2)

describe('ProductsController (seller role)', () => {
  let controller: ProductsController
  let app: INestApplication
  let productsService: any

  beforeEach(async () => {
    productsService = {
      create: jest.fn(() => PROMISE_PRODUCT1),
      findOne: jest.fn((id) => (id === 2 ? PROMISE_PRODUCT2 : PROMISE_PRODUCT1)),
      findAll: jest.fn(() => Promise.resolve([PRODUCT1, PRODUCT2])),
      update: jest.fn(() => PROMISE_PRODUCT1),
      remove: jest.fn(() => PROMISE_PRODUCT1),
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: productsService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate: (context: ExecutionContext) => {
          const argumentHost = context.switchToHttp()
          const request = argumentHost.getRequest()
          request.user = {
            id: SELLER_ID,
            role: 'seller',
          }

          return true
        },
      })
      .compile()

    controller = module.get<ProductsController>(ProductsController)
    app = module.createNestApplication()
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
        whitelist: true,
        forbidNonWhitelisted: true,
      })
    )
    await app.init()
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('/POST', async () => {
    await request(app.getHttpServer()).post('/products').send(PRODUCT1).expect(201).expect(PRODUCT1)
    expect(productsService.create).toHaveBeenCalledTimes(1)
  })

  it('/POST (invalid cost)', async () => {
    const product: any = { ...PRODUCT1 }
    product.cost = 'test'

    await request(app.getHttpServer()).post('/products').send(product).expect(400)
    expect(productsService.create).not.toHaveBeenCalled()
  })

  it('/POST (invalid sellerId)', async () => {
    const product: any = { ...PRODUCT1 }
    product.sellerId = 'xy'

    await request(app.getHttpServer()).post('/products').send(product).expect(400)
    expect(productsService.create).not.toHaveBeenCalled()
  })

  it('/POST (negative amount)', async () => {
    const product: any = { ...PRODUCT1 }
    product.amountAvailable = -8

    await request(app.getHttpServer()).post('/products').send(product).expect(400)
    expect(productsService.create).not.toHaveBeenCalled()
  })

  it('/GET', async () => {
    await request(app.getHttpServer()).get('/products').expect(200).expect([PRODUCT1, PRODUCT2])
    expect(productsService.findAll).toHaveBeenCalledTimes(1)
  })

  it('/GET :id', async () => {
    await request(app.getHttpServer()).get('/products/1').expect(200).expect(PRODUCT1)
    expect(productsService.findOne).toHaveBeenCalledTimes(1)
  })

  it('/GET :id (invalid id)', async () => {
    await request(app.getHttpServer()).get('/products/notint').expect(400)
    expect(productsService.findOne).not.toHaveBeenCalled()
  })

  it('/PATCH :id', async () => {
    await request(app.getHttpServer()).patch('/products/1').send(PRODUCT1).expect(200).expect(PRODUCT1)
    expect(productsService.findOne).toHaveBeenCalledTimes(1)
    expect(productsService.update).toHaveBeenCalledTimes(1)
  })

  it('/PATCH :id (not own product)', async () => {
    await request(app.getHttpServer()).patch('/products/2').send(PRODUCT2).expect(403)
    expect(productsService.findOne).toHaveBeenCalledTimes(1)
    expect(productsService.update).not.toHaveBeenCalled()
  })

  it('/PATCH :id (invalid id)', async () => {
    await request(app.getHttpServer()).patch('/products/notint').expect(400)
    expect(productsService.update).not.toHaveBeenCalled()
  })

  it('/DELETE :id', async () => {
    await request(app.getHttpServer()).delete('/products/1').expect(200).expect(PRODUCT1)
    expect(productsService.findOne).toHaveBeenCalledTimes(1)
    expect(productsService.remove).toHaveBeenCalledTimes(1)
  })

  it('/DELETE :id (not own product)', async () => {
    await request(app.getHttpServer()).delete('/products/2').expect(403)
    expect(productsService.findOne).toHaveBeenCalledTimes(1)
    expect(productsService.remove).not.toHaveBeenCalled()
  })

  it('/DELETE :id (invalid id)', async () => {
    await request(app.getHttpServer()).delete('/products/notint').expect(400)
    expect(productsService.remove).not.toHaveBeenCalled()
  })
})

describe('ProductsController (buyer role)', () => {
  let controller: ProductsController
  let app: INestApplication
  let productsService: any

  beforeEach(async () => {
    productsService = {
      create: jest.fn(() => PROMISE_PRODUCT1),
      findOne: jest.fn((id) => (id === 2 ? PROMISE_PRODUCT2 : PROMISE_PRODUCT1)),
      findAll: jest.fn(() => Promise.resolve([PRODUCT1, PRODUCT2])),
      update: jest.fn(() => PROMISE_PRODUCT1),
      remove: jest.fn(() => PROMISE_PRODUCT1),
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: productsService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate: (context: ExecutionContext) => {
          const argumentHost = context.switchToHttp()
          const request = argumentHost.getRequest()
          request.user = {
            id: SELLER_ID,
            role: 'buyer',
          }

          return true
        },
      })
      .compile()

    controller = module.get<ProductsController>(ProductsController)
    app = module.createNestApplication()
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
        whitelist: true,
        forbidNonWhitelisted: true,
      })
    )
    await app.init()
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('/POST', async () => {
    await request(app.getHttpServer()).post('/products').send(PRODUCT1).expect(403)
    expect(productsService.create).not.toHaveBeenCalled()
  })

  it('/POST (invalid cost)', async () => {
    const product: any = { ...PRODUCT1 }
    product.cost = 'test'

    await request(app.getHttpServer()).post('/products').send(product).expect(403)
    expect(productsService.create).not.toHaveBeenCalled()
  })

  it('/POST (invalid sellerId)', async () => {
    const product: any = { ...PRODUCT1 }
    product.sellerId = 'xy'

    await request(app.getHttpServer()).post('/products').send(product).expect(403)
    expect(productsService.create).not.toHaveBeenCalled()
  })

  it('/POST (negative amount)', async () => {
    const product: any = { ...PRODUCT1 }
    product.amountAvailable = -8

    await request(app.getHttpServer()).post('/products').send(product).expect(403)
    expect(productsService.create).not.toHaveBeenCalled()
  })

  it('/GET', async () => {
    await request(app.getHttpServer()).get('/products').expect(200).expect([PRODUCT1, PRODUCT2])
    expect(productsService.findAll).toHaveBeenCalledTimes(1)
  })

  it('/GET :id', async () => {
    await request(app.getHttpServer()).get('/products/1').expect(200).expect(PRODUCT1)
    expect(productsService.findOne).toHaveBeenCalledTimes(1)
  })

  it('/GET :id (invalid id)', async () => {
    await request(app.getHttpServer()).get('/products/notint').expect(400)
    expect(productsService.findOne).not.toHaveBeenCalled()
  })

  it('/PATCH :id', async () => {
    await request(app.getHttpServer()).patch('/products/1').send(PRODUCT1).expect(403)
    expect(productsService.findOne).not.toHaveBeenCalled()
    expect(productsService.update).not.toHaveBeenCalled()
  })

  it('/PATCH :id (not own product)', async () => {
    await request(app.getHttpServer()).patch('/products/2').send(PRODUCT2).expect(403)
    expect(productsService.findOne).not.toHaveBeenCalled()
    expect(productsService.update).not.toHaveBeenCalled()
  })

  it('/PATCH :id (invalid id)', async () => {
    await request(app.getHttpServer()).patch('/products/notint').expect(403)
    expect(productsService.update).not.toHaveBeenCalled()
  })

  it('/DELETE :id', async () => {
    await request(app.getHttpServer()).delete('/products/1').expect(403)
    expect(productsService.findOne).not.toHaveBeenCalled()
    expect(productsService.remove).not.toHaveBeenCalled()
  })

  it('/DELETE :id (not own product)', async () => {
    await request(app.getHttpServer()).delete('/products/2').expect(403)
    expect(productsService.findOne).not.toHaveBeenCalled()
    expect(productsService.remove).not.toHaveBeenCalled()
  })

  it('/DELETE :id (invalid id)', async () => {
    await request(app.getHttpServer()).delete('/products/notint').expect(403)
    expect(productsService.remove).not.toHaveBeenCalled()
  })
})
