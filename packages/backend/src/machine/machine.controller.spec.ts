import { ValidationPipe } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication, ExecutionContext } from '@nestjs/common'
import * as request from 'supertest'

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { UserRole } from '../users/user-role'
import { MachineController } from './machine.controller'
import { MachineService } from './machine.service'

type JestMock<T> = {
  [P in keyof T]?: jest.Mock
}

const BUYER = {
  id: 3,
  username: 'Buyer',
  password: '12345678',
  role: UserRole.Buyer,
  deposit: 0,
}

const jwtAuthMockGuard = {
  canActivate: (context: ExecutionContext) => {
    const argumentHost = context.switchToHttp()
    const request = argumentHost.getRequest()
    request.user = BUYER

    return true
  },
}

describe('MachineController', () => {
  let controller: MachineController
  let app: INestApplication
  let mockService: JestMock<MachineService>

  beforeEach(async () => {
    mockService = {
      deposit: jest.fn(() => Promise.resolve()),
      purchase: jest.fn(() => Promise.resolve()),
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [MachineController],
      providers: [
        {
          provide: MachineService,
          useValue: mockService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(jwtAuthMockGuard)
      .compile()

    controller = module.get<MachineController>(MachineController)
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

  it('/POST machine/deposit (invalid amount)', async () => {
    await request(app.getHttpServer())
      .post('/machine/deposit')
      .send({
        amount: 11,
      })
      .expect(400)
    expect(mockService.deposit).not.toHaveBeenCalled()
  })

  it('/POST machine/deposit (negative amount)', async () => {
    await request(app.getHttpServer())
      .post('/machine/deposit')
      .send({
        amount: -14,
      })
      .expect(400)
    expect(mockService.deposit).not.toHaveBeenCalled()
  })

  it('/POST machine/purchase (negative amount)', async () => {
    await request(app.getHttpServer())
      .post('/machine/purchase')
      .send({
        productId: 1,
        amount: -14,
      })
      .expect(400)
    expect(mockService.deposit).not.toHaveBeenCalled()
  })
})
