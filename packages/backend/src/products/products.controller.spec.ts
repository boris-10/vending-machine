import { ValidationPipe } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, ExecutionContext } from '@nestjs/common'
import * as request from 'supertest'

import { ProductsController } from './products.controller'
import { ProductsService } from './products.service'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { UserRole } from '../users/user-role'
import { User } from '../users/entities/user.entity'

type JestMock<T> = {
  [P in keyof T]?: jest.Mock
}

const SELLER_1 = {
  id: 1,
  username: 'First Seller',
  password: '12345678',
  role: UserRole.Seller,
  deposit: 0,
}

const SELLER_2 = {
  id: 2,
  username: 'Second Seller',
  password: '12345678',
  role: UserRole.Seller,
  deposit: 0,
}

const BUYER = {
  id: 3,
  username: 'Buyer',
  password: '12345678',
  role: UserRole.Buyer,
  deposit: 0,
}

const PRODUCT_1 = {
  id: 1,
  name: 'Coca Cola',
  amountAvailable: 3,
  cost: 10,
  seller: SELLER_1,
}

const PRODUCT_2 = {
  id: 2,
  name: 'Snickers',
  amountAvailable: 2,
  cost: 20,
  seller: SELLER_2,
}

const jwtAuthMockGuard = (user: Omit<User, 'products'>) => ({
  canActivate: (context: ExecutionContext) => {
    const argumentHost = context.switchToHttp()
    const request = argumentHost.getRequest()
    request.user = user

    return true
  },
})

describe('ProductsController (Seller)', () => {
  let controller: ProductsController
  let app: INestApplication
  let mockService: JestMock<ProductsService>

  beforeEach(async () => {
    mockService = {
      create: jest.fn(() => Promise.resolve(PRODUCT_1)),
      findAll: jest.fn(() => Promise.resolve([PRODUCT_1])),
      findOne: jest.fn((id) => Promise.resolve(id === 1 ? PRODUCT_1 : PRODUCT_2)),
      update: jest.fn(() => Promise.resolve(PRODUCT_1)),
      remove: jest.fn(() => Promise.resolve(PRODUCT_1)),
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: mockService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(jwtAuthMockGuard(SELLER_1))
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

  it('/POST products', async () => {
    await request(app.getHttpServer())
      .post('/products')
      .send({
        name: PRODUCT_1.name,
        amountAvailable: PRODUCT_1.amountAvailable,
        cost: PRODUCT_1.cost,
      })
      .expect(201)
      .expect(PRODUCT_1)
    expect(mockService.create).toHaveBeenCalledTimes(1)
  })

  it('/POST products (invalid cost)', async () => {
    await request(app.getHttpServer())
      .post('/products')
      .send({
        name: PRODUCT_1.name,
        amountAvailable: PRODUCT_1.amountAvailable,
        cost: 11,
      })
      .expect(400)
    expect(mockService.create).not.toHaveBeenCalled()
  })

  it('/POST products (negative cost)', async () => {
    await request(app.getHttpServer())
      .post('/products')
      .send({
        name: PRODUCT_1.name,
        amountAvailable: PRODUCT_1.amountAvailable,
        cost: -10,
      })
      .expect(400)
    expect(mockService.create).not.toHaveBeenCalled()
  })

  it('/GET products', async () => {
    await request(app.getHttpServer()).get('/products').expect(200).expect([PRODUCT_1])
    expect(mockService.findAll).toHaveBeenCalledTimes(1)
  })

  it('/GET products/:id', async () => {
    await request(app.getHttpServer()).get('/products/1').expect(200).expect(PRODUCT_1)
    expect(mockService.findOne).toHaveBeenCalledTimes(1)
  })

  it('/GET products/:id (invalid id)', async () => {
    await request(app.getHttpServer()).get('/products/xyz').expect(400)
    expect(mockService.findOne).not.toHaveBeenCalled()
  })

  it('/PATCH products/:id', async () => {
    await request(app.getHttpServer())
      .patch('/products/1')
      .send({
        name: PRODUCT_1.name,
      })
      .expect(200)
    expect(mockService.findOne).toHaveBeenCalledTimes(1)
    expect(mockService.update).toHaveBeenCalledTimes(1)
  })

  it('/PATCH products/:id (not owner of the product)', async () => {
    await request(app.getHttpServer()).patch('/products/2').send({ name: PRODUCT_2.name }).expect(403)
    expect(mockService.findOne).toHaveBeenCalledTimes(1)
    expect(mockService.update).not.toHaveBeenCalled()
  })

  it('/PATCH products/:id (invalid id)', async () => {
    await request(app.getHttpServer()).patch('/products/xyz').send({ name: PRODUCT_1.name }).expect(400)
    expect(mockService.findOne).not.toHaveBeenCalled()
    expect(mockService.update).not.toHaveBeenCalled()
  })

  it('/DELETE :id', async () => {
    await request(app.getHttpServer()).delete('/products/1').expect(200)
    expect(mockService.findOne).toHaveBeenCalledTimes(1)
    expect(mockService.remove).toHaveBeenCalledTimes(1)
  })

  it('/DELETE products/:id (not own product)', async () => {
    await request(app.getHttpServer()).delete('/products/2').expect(403)
    expect(mockService.findOne).toHaveBeenCalledTimes(1)
    expect(mockService.remove).not.toHaveBeenCalled()
  })
})

describe('ProductsController (Buyer)', () => {
  let controller: ProductsController
  let app: INestApplication
  let mockService: JestMock<ProductsService>

  beforeEach(async () => {
    mockService = {
      create: jest.fn(() => Promise.resolve(PRODUCT_1)),
      findAll: jest.fn(() => Promise.resolve([PRODUCT_1])),
      findOne: jest.fn((id) => Promise.resolve(id === 1 ? PRODUCT_1 : PRODUCT_2)),
      update: jest.fn(() => Promise.resolve(PRODUCT_1)),
      remove: jest.fn(() => Promise.resolve(PRODUCT_1)),
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: mockService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(jwtAuthMockGuard(BUYER))
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

  it('/POST products (buyer cannot create products)', async () => {
    await request(app.getHttpServer())
      .post('/products')
      .send({
        name: PRODUCT_1.name,
        amountAvailable: PRODUCT_1.amountAvailable,
        cost: PRODUCT_1.cost,
      })
      .expect(403)
    expect(mockService.create).not.toHaveBeenCalled()
  })

  it('/PATCH products/:id (buyer cannot update products)', async () => {
    await request(app.getHttpServer())
      .patch('/products/1')
      .send({
        name: PRODUCT_1.name,
      })
      .expect(403)
    expect(mockService.update).not.toHaveBeenCalled()
  })

  it('/DELETE products/:id (buyer cannot delete products)', async () => {
    await request(app.getHttpServer()).delete('/products/1').expect(403)
    expect(mockService.update).not.toHaveBeenCalled()
  })
})
