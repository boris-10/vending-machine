import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../src/app.module'

describe('AuthController (e2e)', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/auth/me (GET)', () => {
    return request(app.getHttpServer()).get('/auth/me').expect(401)
  })

  it('/auth/login fail (POST)', () => {
    return request(app.getHttpServer()).post('/auth/login').send({ username: 'xx', password: 'xx' }).expect(401)
  })

  it('/auth/login pass (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'test1', password: '123456' })
      .expect(201)
      .expect((response) => response.body.accessToken)
  })

  afterAll(async () => {
    await app.close()
  })
})
