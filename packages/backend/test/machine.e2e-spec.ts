import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../src/app.module'

describe('MachineController (e2e)', () => {
  let app: INestApplication
  let token: string

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()

    const { body } = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'test3', password: '123456' })

    token = body.accessToken
  })

  it('can deposit and buy', async () => {
    const AMOUNT = 100

    await request(app.getHttpServer())
      .post('/machine/deposit')
      .auth(token, { type: 'bearer' })
      .send({ amount: AMOUNT })
      .expect(201)
      .expect((response) => response.body.deposit === AMOUNT)

    return request(app.getHttpServer())
      .post('/machine/buy')
      .auth(token, { type: 'bearer' })
      .send({ productId: 2, amount: 1 })
      .expect(201)
      .expect([
        { coin: 50, count: 1 },
        { coin: 20, count: 1 },
        { coin: 5, count: 1 },
      ])
  })

  it('can deposit and reset', async () => {
    const AMOUNT = 100

    await request(app.getHttpServer())
      .post('/machine/deposit')
      .auth(token, { type: 'bearer' })
      .send({ amount: AMOUNT })
      .expect(201)
      .expect((response) => response.body.deposit === AMOUNT)

    return request(app.getHttpServer()).post('/machine/reset').auth(token, { type: 'bearer' }).expect(201)
  })

  it('can deposit and have no money', async () => {
    const AMOUNT = 5

    await request(app.getHttpServer())
      .post('/machine/deposit')
      .auth(token, { type: 'bearer' })
      .send({ amount: AMOUNT })
      .expect(201)
      .expect((response) => response.body.deposit === AMOUNT)

    await request(app.getHttpServer())
      .post('/machine/buy')
      .auth(token, { type: 'bearer' })
      .send({ productId: 2, amount: 1 })
      .expect(400)

    return request(app.getHttpServer()).post('/machine/reset').auth(token, { type: 'bearer' }).expect(201)
  })

  afterAll(async () => {
    await app.close()
  })
})
